<template>
    <section id="container">
      <div id="content">
        <div class="post-general" v-for="post in postInfo" :key="post">
          <div class="user-info">
            <span><img src="../assets/placeholder-user-icon.svg">{{post.firstName}} <p>{{post.jobPosition}}</p></span>
          </div>
          <a @click="linkToPost(post.postID)">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-body-preview"><p>{{ post.body }}</p></div>
          </a>
          <a class="post-image" @click="linkToPost(post.postID)"><img v-bind:src="require(`../assets/image/${post.image}`)"></a>
          <div class="topic">Topic: <a href="#"> {{ post.topicName }}</a>
            <button v-if="this.userPostInfo[0].followed_topics.split(',').includes(`${post.topicID}`)" ><img src="../assets/circle-check-solid.svg"></button>
          </div>
          <div class="read-status">
            <p v-if="!this.userPostInfo[0].read_status.split(',').includes(`${post.postID}`)"><img src="../assets/bookmark-solid.svg">Unread</p>
            <p v-else><img src="../assets/bookmark-regular.svg">Read</p>
            </div>
        </div>
      </div>
    </section>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios'
  export default {
    name: 'PostOverview',
    components: {
     
    },
    data() {
      return {
        isRead: false,
        isFollowed: false,
        newFollowed: false,
        postInfo: [{ }],
        userPostInfo: [{ }],
      }
    },
    methods: {
      async fetchPostInfo() {
          const res = await fetch(`http://localhost:3000/post`)
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

      async test(topicID) {
        let test = this.userPostInfo[0].followed_topics;
        let length = test.length;
        console.log(test)
        console.log(length)
        if (length > 1) {
          if (!this.userPostInfo[0].followed_topics.split(',').includes(`${topicID}`)) {
            return true
          } else {
            return false
          }
        } else {
          if (!this.userPostInfo[0].followed_topics === topicID) {
            return true
          } else {
            return false
          }
        }
      },
      async linkToPost(id) {
        let decoded = '';
            let token = localStorage.getItem('token');
            try{
              decoded = VueJwtDecode.decode(token)
            }
            catch(err){
              console.log('token is null: ',err);
              window.location = "http://localhost:8080/auth";
            }
        let userid = JSON.stringify(decoded.userId);
        let readPosts = this.userPostInfo[0].read_status.split(',');
        if (!readPosts.includes(`${id}`)) {
          readPosts.push(id)
          let update = readPosts.toString()
          let JSON = {"update": update}
          this.userPostInfo.readPosts = readPosts
          await axios.post(`http://localhost:3000/dynamic/sendReadStatus/${userid}`, JSON)
            .catch(error => console.log(error))
            window.location = `http://localhost:8080/post/${id}`;
        } else {
          console.log('its already there');
            window.location = `http://localhost:8080/post/${id}`;
        }
      },
      toggleFollowTopicStatus() {
        /*
        let followedTopics = this.userPostInfo[0].followed_topics.split(',').includes('1');
        console.log(followedTopics)
        
        if (this.isFollowed === true) {
          this.newFollowed = true
        } else {
          this.newFollowed = false
        }*/
      },
      
    },
    async created() {
      this.userPostInfo = await this.fetchUserPostInfo()
      this.postInfo = await this.fetchPostInfo()
    },
        
  }

</script>

<style scoped>
 #container {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #content {
    height: auto;
    width: 55%;
    background-color: #FFF7E8;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5em;
  }

  .post-general {
    height: 23em;
    width: 85%;
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

  .post-general a {
    cursor:pointer; 
  }

  .user-info {
    margin-top: 0.5em;
    height: 2em;
    font-size: 14px;
    display: flex;
    flex-flow: row;
    align-items: center;
    font-family: Sans-Semibold;
  }

  .user-info span {
    display: flex;
    flex-flow: row;
  }

  .user-info img {
    margin-right: 1em;
    width: 1.5em;
    height: 1.5em;
    border-radius: 100%;
  }
  .user-info p {
    margin: 0.05em 0 0 0.8em;
    font-size: 0.9em;
    font-family: Sans-Regular;
  }

  .post-title {
    font-family: Sans-Bold;
    font-size: 1em;
  }

  .post-body-preview {
    margin: -0.2em 0 0.2em 0;
    font-size: 0.9em;
    width: 95%;
    height: 2em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; 
    display: flex;
    align-items: center;
  }
  .post-body-preview p {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden; 
  }

  .post-image {
    margin-left: -1.1em;
    width: 99%;
    height: 55%;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    border-radius: 15px;
  }

 .topic {
    height: 1.5em;
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

  .read-status {
    margin: 0 0 0.5em 0;
    height: 1.5em;
    font-size: 0.8em;

  }

  .read-status img {
    width: 1em;
    height: 1em;
    margin-right: 0.2em;
  }

  .read-status p {
    width: 6em;
    display: flex;
    align-items: center;
    border-width: 2px;
    border-radius: 20px;
    border-color: #FFC90E;
    background-color: white;
    margin: 0;
  }

</style>