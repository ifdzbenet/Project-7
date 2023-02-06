<template>
    <Header />
    <SideContent />
    <PostOverview />


  </template>
  
<script>
  import Header from '../components/Header.vue'
  import PostOverview from '../components/PostOverview.vue'
  import SideContent from '../components/SideContent.vue'
  
  export default {
    name: 'HomeView',
    components: {
      Header,
      PostOverview,
      SideContent
    },
    data() {
      
    },
  }
</script>

<style scoped>

</style>

