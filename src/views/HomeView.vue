<template>
    <Header />
    <PostOverview />


  </template>
  
<script>
  import Header from '../components/Header.vue'
  import PostOverview from '../components/PostOverview.vue'
  
  export default {
    name: 'HomeView',
    components: {
      Header,
      PostOverview,
    },
    
  }
</script>

<style scoped>

</style>

