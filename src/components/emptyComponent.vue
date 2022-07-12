<template>
  <div class="holder">
    <img src="../assets/empty.svg" class="empty-image"/>
    <p class="empty-message">{{ message }}</p>
  </div>

</template>

<script>
export default {
  name: "emptyComponent",
  props: {
    message: {
      type: String,
      required: true,
      default: 'No data available'
    }
  },
  data: function () {
    return {}
  }
}
</script>

<style scoped>
.empty-message {
  margin-top: 15px;
}

.empty-image {
  height: 66px;
  width: 66px;
  margin: auto;

}

.holder {
  display: table;
  margin: auto;
  margin-top: 57px;

}
</style>