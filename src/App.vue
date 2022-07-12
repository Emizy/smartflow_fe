<template>
  <div id="app">
    <div class="h-full">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  flex: 1 !important;
}
</style>