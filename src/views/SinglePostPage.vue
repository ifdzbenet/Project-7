<template>
    <Header />
    <section id="container">
        <div class="content">
            <div class="post-general">
                <div class="user-info">
                    <span><img v-bind:src="`../image/${post[0].profilePicture}`">{{post[0].firstName}} {{post[0].lastName}}<p>{{post[0].jobPosition}}</p></span>
                </div>
                <div class="post-title">{{ post[0].title }}</div>
                <div class="post-image"><img v-bind:src="`../image/${post[0].image}`"></div>
                <div class="post-body"><p>{{ post[0].body }}</p></div>
                <div id="flex">
                  <div class="topic">Topic: <a href="#"> {{ post[0].topicName }}</a></div>
                  <div class="button-box">
                  <button class="button update" v-if="post[0].userID == user[0].userID" @click="goToUpdatePage()">Update post</button>
                  <button class="button delete" v-if="post[0].userID == user[0].userID" @click="promptDelete()">Delete post</button>
                </div>
                </div>
            </div>
            <div id="deletePrompt" v-if="deletePrompt">
                <div id="delete-msg">Are you sure you want to delete this post?
                  <div class="button-box">
                  <button class="button delete" @click="deletePost()">Delete</button>
                  <button class="button update" @click="promptDelete()">Cancel</button>
                </div>
                </div>
            </div>
        </div>
    </section>
  </template>
  
<script>
import VueJwtDecode from 'vue-jwt-decode'
  import Header from '../components/Header.vue'
  import axios from 'axios'

  export default {
    name: 'PostPage',
    components: {
      Header,
    },
    data(){
      return { 
        post: [{ }],
        user: [{}],
        deletePrompt: false,
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
      async fetchUserInfo() {
        let decoded = '';
        let token = localStorage.getItem('token');
          try{
            decoded = VueJwtDecode.decode(token)
          }
          catch(err){
            window.location = "http://localhost:8080/auth";
          }
        let id = JSON.stringify(decoded.userId);
        const res = await fetch(`http://localhost:3000/userInfo/${id}`)
        const data = await res.json()
        return data
      },
      goToUpdatePage() {
        let id = this.post[0].postID;
        window.location = `http://localhost:8080/post/update-post/${id}`
      },
      promptDelete() {
        this.deletePrompt = !this.deletePrompt
      },
      async deletePost() {
        let id = this.post[0].postID;
       axios.delete(`http://localhost:3000/post/${id}`)
          .then(function(){console.log('ok')})
          .then(function() {window.location = "http://localhost:8080/"; })
          .catch(function(){console.log('nope')})
      }

    },

    async created() {
        this.post = await this.fetchPostInfo()
        this.user = await this.fetchUserInfo()
    },
  }
</script>

<style scoped>
#container {
    height: 100vh;
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
    padding-top: 5em;
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
    width: 50%;
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

  .button-box {
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }

  .button {
    width: 40%;
    height: 2.5em;
    border-style: none;
    padding: 0 0.2em 0 0.2em;
    margin: 0 0.5em 0 0;
    border-radius: 10px;
    font-family: Sans-Bold;
    cursor:pointer; 
}

.update {
  background-color: #FD2D01;
  color: white;
}

.delete {
  background-color: #FFD7D7;
  color: #FD2D01;
}

#flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

#deletePrompt {
  position: absolute;
  z-index: 1;
  top: 40%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: rgba(128, 128, 128, 0.83);
  border-radius: 50px;
  width: 50%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#delete-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  border-radius: 30px;
  width: 55%;
  height: 60%;
  padding: 2em;
  background-color: white;
}

@media only screen and (max-width: 800px) {
  #container {
    height: 100%;
  }
  .content {
    height: 100%;
    width: 90%;
  }
  .post-general {
    height: auto;
    width: 75%;
    padding-left: 1.5em;
  }
  .post-title {
    height: 2.5em;
  }
  .post-image {
    margin-left: -1.5em;
    width: 90%;
    align-self: center;
  }

  #flex {
    height: 6em;
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: flex-start;
}

  .topic {
    width: 15em;
    height: 3em;
 }

 #button-box {
  width: 80%;
  height: 3em;
 }
 .button {
    width: 15em;
    height: 2.5em;
  }

  #deletePrompt {
    top: 40%;
    left: 50%;
    width: 90%;
    height: 60%;
  }

}

</style>

