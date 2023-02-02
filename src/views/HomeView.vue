<template>
    <Header />
    <button @click="toCreatePost">Create a post</button>
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
    data() {
      
    },
    methods: {
      toCreatePost() {
        window.location = `http://localhost:8080/post/create-post`;
      }
    }
  }
</script>

<style scoped>
button {
  position: fixed;
  cursor:pointer; 
  left: 3em;
  top: 7em;
  width: 15%;
  height: 2.5em;
  border-style: none;
  padding: 0;
  color: white;
  border-radius: 10px;
  font-family: Sans-Bold;
  background-color: #FD2D01;
}
</style>

