<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {}
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

    .main{
    float:left;
    width:95%; 
    background-color: #EFF2F7;
    height:100%;
    overflow: auto;
  }
</style>
