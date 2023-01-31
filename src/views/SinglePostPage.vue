<template>
    <Header />
    <section id="container">
        <div class="content">
            <div class="post-general">
                <div class="user-info">
                    <span><img src="../assets/placeholder-user-icon.svg">{{post[0].firstName}} {{post[0].lastName}}<p>{{post[0].jobPosition}}</p></span>
                </div>
                <div class="post-title">{{ post[0].title }}</div>
                <div class="post-image" @click="linkToPost(post[0].postID)"><img v-bind:src="require(`../assets/image/${post[0].image}`)"></div>
                <div class="post-body"><p>{{ post[0].body }}</p></div>
                <div>
                    <div class="topic">Topic: <a href="#"> {{ post[0].topicName }}</a></div>

                </div>
            </div>
        </div>
    </section>
  </template>
  
<script>
import VueJwtDecode from 'vue-jwt-decode'
  import Header from '../components/Header.vue'
  
  export default {
    name: 'PostPage',
    components: {
      Header,
    },
    data(){
        return { 
            post: [{ }],
            userInPost: [{ }],
        }
    },
    methods: {
        async fetchPostInfo() {
            let url =  window.location.pathname;
            let id = url.split('/').pop();
            const res = await fetch(`http://localhost:3000/post/${id}`)
            const data = await res.json()
            return data
        },
        async fetchUserPostInfo() {
            let decoded = '';
                let token = localStorage.getItem('token');
                try{
                    decoded = VueJwtDecode.decode(token)
                }
                catch(err){
                    console.log('token is null: ',err);
                    window.location = "http://localhost:8080/auth";
                }
                let id = JSON.stringify(decoded.userId);
            const res = await fetch(`http://localhost:3000/dynamic/userPostInfo/${id}`)
            const data = await res.json()
            return data
        },
      
    },

    async created() {
        this.userPostInfo = await this.fetchUserPostInfo()
        this.post = await this.fetchPostInfo()
    },
  }
</script>

<style scoped>
#container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content {
    height: 100%;
    width: 70%;
    background-color: #FFF7E8;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-top: 2.5em;
  }

  .post-general {
    height: auto;
    width: 70%;
    margin-bottom: 1.5em;
    padding-left: 2.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: white;
    border-radius: 20px;
    position: relative;
    box-shadow: 2px 2px 20px #0000004a;
  }

  .user-info {
    margin-top: 0.5em;
    height: 3.5em;
    font-size: 14px;
    display: flex;
    flex-flow: row;
    align-items: center;
    font-family: Sans-Semibold;
  }

  .user-info span {
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  .user-info img {
    margin-right: 1em;
    width: 2em;
    height: 2em;
    border-radius: 100%;
  }
  .user-info p {
    margin: 0.05em 0 0 0.8em;
    font-size: 0.9em;
    font-family: Sans-Regular;
  }

  .post-title {
    height: 2em;
    font-family: Sans-Bold;
    font-size: 1em;
  }

  .post-body {
    padding: 1em 0 1em 0;
    font-size: 0.9em;
    width: 95%;
    height: auto;
  }
  .post-body p {
    margin: 0;
  }

  .post-image {
    margin-left: -2.5em;
    width: 90%;
    align-self: center;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

 .topic {
    height: 3em;
    font-size: 0.9em;
    margin: 0.2em 0 0.2em 0;
    display: flex;
    align-items: center;
 }

 .topic a {
    padding-left: 0.3em;
    font-size: 1em;
    text-decoration: none;
    color: black;
  }
 .topic a:hover {
    color:#FD2D01; 
    text-decoration:none; 
    cursor:pointer;  
  }
 .topic img {
    width: 1.1em;
    height: 1.1em;
  }

  .topic button {
    border-style: none;
    background-color: white;
    display: flex;
    align-items: center;
  }

  .topic p {
    margin: 0.2em 0 0 0;
    font-size: 0.8em;
    padding: 0 0.2em 0 0.2em;
    border-radius: 2px;
    color: #FD2D01;
    background-color:#ffefd2;
  }
</style>

