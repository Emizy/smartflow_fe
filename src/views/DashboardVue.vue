<template>
  <div class="container  __container">
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="row no-gutters mb-7">
          <div class="col-6">
            <h4 class="text-left font-semibold">Sales Record</h4>
          </div>
          <div class="col-6">
            <div class="form-group filter-holder">
              <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="loading" v-on:click="addSales">ADD
                SALES
              </el-button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="flex justify-content-between">
              <el-input placeholder="Search" class="search-input" size="mini" v-on:input="searchSales"
                        v-model="searchName"></el-input>
              <el-select v-model="filter" placeholder="Select" size="mini" clearable v-on:change="filterSales"
                         v-on:clear="filterSales">
                <el-option
                    v-for="(item,key) in statusList"
                    :key="key"
                    :label="item.name"
                    :value="item.key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="table-responsive" v-loading="loading">
              <table class="table mb-0 table-responsive-sm">
                <thead>
                <tr>
                  <th>
                    S/N
                  </th>
                  <th>
                    Customer Name
                  </th>
                  <th>
                    Amount
                  </th>
                  <th>
                    Litre Dispensed (ltr)
                  </th>
                  <th>
                    Location
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Date created
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
                </thead>
                <tbody v-if="GET_SALES.results.length > 0">
                <table-list @remove="deleteItem" v-for="(item,key) in GET_SALES.results" v-bind:sale="item" :key="key"
                            :counter="key"/>
                </tbody>
                <tbody class="" v-else>
                <tr style="background: transparent !important;">
                  <td colspan="7">
                    <empty-component :message="message"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-md-12 paggy">
               <span class="flex justify-between align-items-center space-x-5 mt-4 float-left">
                                  <span class="text-base"></span>
                                  <span>
                    <el-select v-model="limit" placeholder="Select" size="small" style="width: 69px;"
                               v-on:change="getSalesRecords">
                      <el-option
                          v-for="item in [10,20,30,40,50]"
                          :key="item"
                          :label="item"
                          :value="item">
                      </el-option>
                    </el-select>
                                  </span>
                              </span>
            <el-pagination class="float-right pag mt-4"
                           background
                           @current-change="changePageNumber"
                           layout="prev, pager, next"
                           :total="1">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableList from "@/views/tableList";
import emptyComponent from "@/components/emptyComponent";
import {mapGetters} from "vuex";
import debounce from 'lodash.debounce'

export default {
  name: "DashboardVue",
  components: {tableList, emptyComponent},
  data: function () {
    return {
      loading: false,
      limit: 20,
      searchName: '',
      pageNum: '',
      filter: '',
      message: 'You are yet to create sales entry',
      payload: {
        search: ''
      },
      statusList: [
        {key: 'done', name: 'DONE'},
        {key: 'not_done', name: 'NOT DONE'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      GET_SALES: 'general/GET_SALES'
    })
  },
  mounted() {
    window.Bus.$on('load-sales-record', () => {
      this.getSalesRecords()
    })
  },
  methods: {
    changePageNumber: function (number) {
      let url = `?page=${number}&limit=20`
      if (this.searchName !== '' || this.searchName !== undefined) {
        url = url + `&search=${this.searchName}`
      }
      this.loading = true
      this.pageNum = number
      this.$store.dispatch('general/FETCH_SALES', {data: url})
          .then(_ => {
            //
          }).catch((err) => {
      })
      this.loading = false
    },
    filterSales: function () {
      let url = `?limit=20`
      if (this.filter !== '') {
        url += `&status=${this.filter}`
        if (this.searchName !== '') {
          url += `&search=${this.searchName}`
        }
        this.loading = true
        this.$store.dispatch('general/FETCH_SALES', {data: url}).then(res => {
          if (res.data.data.results.length === 0) {
            this.message = 'No sales matches your filter'
          } else {
            this.message = 'Yet to create a sales entry'
          }
        })
        this.loading = false
      } else {
        this.filter = ''
        this.getSalesRecords()
      }
    },
    deleteItem: function (sale) {
      let salesIndex = this.GET_SALES.results.findIndex(item => sale.id === item.id)
      if (salesIndex > -1) {
        this.GET_SALES.results.splice(salesIndex, 1)
      }
    },
    searchSales: debounce(function (event) {
      let url = `?limit=20`
      if (this.searchName !== '') {
        url += `&search=${this.searchName}`
        this.loading = true
        this.$store.dispatch('general/FETCH_SALES', {data: url}).then(res => {
          if (res.data.data.results.length === 0) {
            this.message = 'No sales matches your search'
          } else {
            this.message = 'Yet to create a sales entry'
          }
        })
        this.loading = false
      } else {
        this.searchName = ''
        this.getSalesRecords()
      }
    }, 500),
    getSalesRecords: function () {
      this.loading = true
      let pageUrl = `?limit=${this.limit}`
      this.$store.dispatch('general/FETCH_SALES', {data: pageUrl}).then(() => {
        this.loading = false
      }).catch(err => {
        if (err.response.status === 401) {
          window.Bus.$emit('refresh_token')
        }
      })
    },
    addSales: function () {
      window.Bus.$emit('open-create-sales-form', {})
    }
  },

}
</script>

<style scoped>
.filter-holder {
  float: right;
}

.search-input {
  width: 20%;
  float: left;
  margin-bottom: 25px
}

@media only screen and (max-width: 640px) {
  .filter-holder {
    margin-top: 25px;
    float: left;
  }

  .search-input {
    width: 50% !important;
  }
}
</style>