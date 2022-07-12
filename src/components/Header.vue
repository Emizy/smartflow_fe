<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <nav class="navbar">
            <div class="header-search d-flex align-items-center">
              <a class="brand-logo mr-3" href="">

              </a>
            </div>
            <div class="dashboard_log">
              <div class="d-flex align-items-center">
                <div class="profile_log dropdown">
                  <div>
                    <span class="mr-3 font-semibold">{{ getName() }}</span>
                    <span class="cursor-pointer" v-on:click="signOut">Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "HeaderVue",
  computed: {
    ...mapGetters({
      GET_USER: 'general/GET_USER'
    })
  },
  methods: {
    signOut: function () {
      this.$store.commit('auth/PURGE_TOKEN')
      this.$store.commit('general/PURGE_STATE')
      window.Bus.$emit('session-out')
    },
    getName() {
      if (this.GET_USER.name) {
        try {
          return this.GET_USER.name
        } catch (e) {
          return ''
        }
      }
    },
  }
}
</script>

<style scoped>

</style>