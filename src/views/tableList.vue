<template>
  <tr>
    <td>
      {{ counter + 1 }}
    </td>
    <td>
      <span>{{ sale.customer_name }}</span>
    </td>
    <td>
      <span> {{ sale.amount }}</span>
    </td>
    <td>
      <span>{{ sale.volume_dispensed }}</span>
    </td>
    <td>
      <span>{{ sale.location }}</span>
    </td>
    <td>
      <span class="badge badge-success text-white" v-if="sale.status === 'done'">DONE</span>
      <span class="badge badge-warning text-white" v-else>NOT DONE</span>
    </td>
    <td>
      <span>{{ sale.created_at }}</span>
    </td>
    <td>
      <i class="el-icon-edit mr-2 cursor-pointer" v-on:click="onEdit"></i>
      <i class="el-icon-delete" :class="{'cursor-pointer': sale.status !== 'done'}" v-on:click="onDelete"></i>
    </td>
  </tr>
</template>

<script>
export default {
  name: "tableList",
  props: {
    sale: {
      type: Object,
      required: true
    },
    counter: {
      type: Number,
      required: true
    }
  },
  methods: {
    onEdit: function () {
      if (this.sale.status === 'done') {
        return this.$message({
          type: 'warning',
          message: 'Sales could not be edit since it already marked done.'
        })
      }
      window.Bus.$emit('open-sales-edit-form', this.sale)
    },
    onDelete: function () {
      if (this.sale.status === 'done') {
        return this.$message({
          type: 'warning',
          message: 'Sales could not be deleted since it already marked done.'
        })
      }
      this.$confirm('Are you sure of deleting this sales entry', 'Confirm', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonClass: 'bg-delete',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = 'Loading...';
            this.$store.dispatch('general/DELETE_SALE', {id: this.sale.id}).then(() => {
              instance.confirmButtonLoading = false;
              this.$message({
                type: 'success',
                message: 'Sales deleted successfully'
              })
              this.$emit('remove', {id: this.sale.id})
              done();
            }).catch(err => {
              this.$message({
                type: 'warning',
                message: err.response.data.message
              })
            })
          } else {
            done();
          }
        }
      }).then(() => {
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>

</style>