<template>
  <div id="main-wrapper">
    <Header/>
    <div class="content-body">
      <router-view/>
    </div>
    <Footer/>
    <Modal v-if="openLogin" :width="600" title="LOGIN">
      <div class="container" slot="body">
        <form v-on:submit.prevent="onLogin">
          <div class="row">
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Email</label>
              <el-input placeholder="Username" type="text" class="w-100"
                        v-model="loginForm.username"></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Password</label>
              <el-input placeholder="Password" type="password" class="w-100"
                        v-model="loginForm.password"></el-input>
            </div>
            <div class="col-md-12">
              <el-button type="primary" native-type="submit" class="mt-4"
                         :disabled="loading">Login<i
                  class="el-icon-loading ml-2" v-if="loading"></i>
              </el-button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-md-10 mx-auto mt-3">
            <p class="mb-2 register-text cursor-pointer" v-on:click="switchAuth('register')">
              Don't have an account? Register here
            </p>
          </div>
        </div>
      </div>
      <div slot="footer" class="flex space-x-5">

      </div>
    </Modal>
    <Modal v-if="openRegister" :width="600" title="REGISTER">
      <div class="container" slot="body">
        <form v-on:submit.prevent="onRegister">
          <div class="row">
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Name</label>
              <el-input placeholder="Name" type="text" class="w-100"
                        v-model="registerForm.name" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Email</label>
              <el-input placeholder="Email" type="email" class="w-100"
                        v-model="registerForm.email" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Password</label>
              <el-input placeholder="Password" type="password" class="w-100"
                        v-model="registerForm.password" required></el-input>
            </div>
            <div class="col-md-12">
              <el-button type="primary" native-type="submit" class="mt-4"
                         :disabled="loading">Register<i
                  class="el-icon-loading ml-2" v-if="loading"></i>
              </el-button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-md-10 mx-auto mt-3">
            <p class="mb-2 register-text " :class="{'cursor-pointer': loading === false}"
               v-on:click="switchAuth('login')">
              Already have an account? Login here
            </p>
          </div>
        </div>
      </div>
      <div slot="footer" class="flex space-x-5">

      </div>
    </Modal>
    <Modal v-if="openSalesForm" :width="600" title="CREATE SALES">
      <div class="container" slot="body">
        <form v-on:submit.prevent="createSales">
          <div class="row">
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Customer Name</label>
              <el-input placeholder="Name" type="text" class="w-100"
                        v-model="salesForm.customer_name" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Litre Dispensed</label>
              <el-input placeholder="Litre Dispensed" type="number" min="0" class="w-100"
                        v-model="salesForm.volume_dispensed" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Amount</label>
              <el-input placeholder="Amount" type="number" min="0" class="w-100"
                        v-model="salesForm.amount" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Location</label>
              <textarea placeholder="Location" rows="2" class="w-100 rounded text-area border"
                        v-model="salesForm.location" required></textarea>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Status</label>
              <el-select v-model="salesForm.status" placeholder="Select" class="w-full">
                <el-option
                    v-for="(item,key) in statusList"
                    :key="key"
                    :label="item.name"
                    :value="item.key">
                </el-option>
              </el-select>
            </div>
            <div class="col-md-12">
              <el-button type="primary" native-type="submit" class="mt-4"
                         :disabled="loading">CREATE SALES<i
                  class="el-icon-loading ml-2" v-if="loading"></i>
              </el-button>
            </div>
          </div>
        </form>
      </div>
      <div slot="footer" class="flex space-x-5">

      </div>
    </Modal>
    <Modal v-if="openSalesEditForm" :width="600" title="UPDATE SALES">
      <div class="container" slot="body">
        <form v-on:submit.prevent="updateSales">
          <div class="row">
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Customer Name</label>
              <el-input placeholder="Name" type="text" class="w-100"
                        v-model="salesForm.customer_name" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Litre Dispensed</label>
              <el-input placeholder="Litre Dispensed" type="number" min="0" class="w-100"
                        v-model="salesForm.volume_dispensed" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Amount</label>
              <el-input placeholder="Amount" type="number" min="0" class="w-100"
                        v-model="salesForm.amount" required></el-input>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Location</label>
              <textarea placeholder="Location" rows="2" class="w-100 rounded text-area border"
                        v-model="salesForm.location" required></textarea>
            </div>
            <div class="col-md-12 mt-3" style="position:relative;">
              <label class="mr-sm-2 label">Status</label>
              <el-select v-model="salesForm.status" placeholder="Select" class="w-full">
                <el-option
                    v-for="(item,key) in statusList"
                    :key="key"
                    :label="item.name"
                    :value="item.key">
                </el-option>
              </el-select>
            </div>
            <div class="col-md-12">
              <el-button type="primary" native-type="submit" class="mt-4"
                         :disabled="loading">UPDATE SALES<i
                  class="el-icon-loading ml-2" v-if="loading"></i>
              </el-button>
            </div>
          </div>
        </form>
      </div>
      <div slot="footer" class="flex space-x-5">

      </div>
    </Modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Modal from "@/components/Modal";
import Header from "@/components/Header";

export default {
  name: "MainVue",
  components: {Modal, Header},
  data: function () {
    return {
      openLogin: false,
      openRegister: false,
      loading: false,
      openSalesForm: false,
      openSalesEditForm: false,
      statusList: [
        {key: 'done', name: 'DONE'},
        {key: 'not_done', name: 'NOT DONE'},
      ],
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      salesForm: {
        "customer_name": "",
        "amount": 0,
        "location": "",
        "volume_dispensed": 0,
        "status": "done"
      },
      salesID: null
    }
  },
  mounted() {
    if (this.IS_AUTHENTICATED === true) {
      window.Bus.$emit('load-sales-record')
      window.Bus.$on('open-create-sales-form', () => {
        this.salesForm = {
          "customer_name": "",
          "amount": 0,
          "location": "",
          "volume_dispensed": 0,
          "status": "done"
        }
        this.openSalesForm = true
      })
      window.Bus.$on('open-sales-edit-form', e => {
        this.salesForm = {
          "customer_name": e.customer_name,
          "amount": e.amount,
          "location": e.location,
          "volume_dispensed": e.volume_dispensed,
          "status": e.status
        }
        this.salesID = e.id
        this.openSalesEditForm = true
      })
    }
  },
  beforeMount() {
    if (this.IS_AUTHENTICATED !== true) {
      this.switchAuth('login')
    }
    window.Bus.$on('session-out', () => {
      this.switchAuth('login')
    })
  },
  computed: {
    ...mapGetters({
      IS_AUTHENTICATED: 'auth/IS_AUTHENTICATED',
      GET_SALES: 'general/GET_SALES'
    })
  },
  methods: {
    onLogin: function () {
      this.loading = true
      this.$store.dispatch('auth/login', this.loginForm).then(res => {
        this.loading = false
        console.log(res.data)
        this.$store.commit('auth/UPDATE_AUTH', res.data)
        this.$store.dispatch('general/FETCH_USER_ACCOUNT')
        window.Bus.$emit('load-sales-record')
        this.openLogin = false
      }).catch(err => {
        if ('detail' in err.response.data) {
          this.$message({
            type: 'warning',
            message: err.response.data.detail
          })
        } else {
          this.$message({
            type: 'warning',
            message: 'Error signing you now, Try Again'
          })
        }
      })
    },
    onRegister: function () {
      this.loading = true
      this.$store.dispatch('auth/register', this.registerForm).then(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: 'Registration successful'
        })
        this.switchAuth('login')
      }).catch(err => {
        this.loading = false
        this.$message({
          type: 'warning',
          message: err.response.data.message
        })
      })
    },
    createSales: function () {
      this.loading = true
      this.$store.dispatch('general/CREATE_SALES', this.salesForm).then(resp => {
        this.loading = false
        this.$message({
          type: 'success',
          message: 'Sales created successfully'
        })
        this.GET_SALES.results.push(resp.data.data)
        this.openSalesForm = false

      }).catch(err => {
        this.loading = false
        this.errorFormat(err)
      })
    },
    updateSales: function () {
      this.loading = true
      this.$store.dispatch('general/UPDATE_SALES', {data: this.salesForm, id: this.salesID}).then(resp => {
        this.loading = false
        this.$message({
          type: 'success',
          message: 'Sales updated successfully'
        })
        let currentRecord = [...this.GET_SALES.results]
        let askRecordIndex = currentRecord.findIndex(item => item.id === this.salesID)
        if (askRecordIndex > -1) {
          currentRecord[askRecordIndex] = resp.data.data
          this.GET_SALES.results = currentRecord
        }
        this.openSalesEditForm = false

      }).catch(err => {
        this.loading = false
        this.errorFormat(err)
      })
    },
    switchAuth: function (tab) {
      if (tab === 'login') {
        this.openRegister = false
        this.openLogin = true
      } else {
        this.openLogin = false
        this.openRegister = true

      }
    },
    errorFormat: function (error) {
      if ([400, 404, 406].includes(error.response.status)) {
        if ('error' in error.response.data) {
          if (Array.isArray(error.response.data.error)) {
            this.$message({
              type: 'warning',
              message: error.response.data.error.join(',')
            });
          } else if (typeof error.response.data.error === 'object') {
            for (const value of Object.values(error.response.data.errors)) {
              if (Array.isArray(value)) {
                this.$message({
                  type: 'warning',
                  message: value.join(',')
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: value
                })
              }
              return false
            }
          } else {
            this.$message({
              type: 'warning',
              message: error.response.data.error
            });
          }
        } else if ('message' in error.response.data) {
          if (Array.isArray(error.response.data.message)) {
            this.$message({
              type: 'warning',
              'message': error.response.data.message.join('')
            });
          } else {
            this.$message({
              type: 'warning',
              'message': error.response.data.message
            });
          }

        }

      } else if (error.response.status === 401) {
        this.openLogin = true
      } else {
        this.$message({
          'type': 'warning',
          'message': 'Something went wrong while processing your request,kindly try again'
        });
      }
    },
  },
}
</script>

<style scoped>
.text-area {
  padding: 5px;
}
</style>