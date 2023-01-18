<template>
    <section id="container">
      <div id="content">
        <div class="post-general" v-for="post in postInfo" :key="post">
          <div class="user-info" v-for="user in userInfo" :key="user" v-show="user.userID == post.userID">
            <span><img src="../assets/placeholder-user-icon.svg">{{user.firstName}} <p>{{user.jobPosition}}</p></span>
          </div>
          <div class="post-title">{{ post.title }}</div>
          <div class="post-body-preview"><p>{{ post.body }}</p></div>
          <div class="post-image"><img src="../assets/backgrounds/logo_design_random.png"></div>
          <div class="topic">Topic: <a href="#">Chaos at the office</a>
            <button v-if="!isFollowed" @click="toggleFollowTopicStatus()"><img src="../assets/circle-plus-solid.svg"></button>
            <button v-if="isFollowed" @click="toggleFollowTopicStatus()"><img src="../assets/circle-check-solid.svg"></button>
                <p v-if="isFollowed">Now following Chaos at the office!</p>
          </div>
          <div class="read-status">
            <p v-if="!isRead"><img src="../assets/bookmark-solid.svg">Unread</p>
            <p v-if="isRead"><img src="../assets/bookmark-regular.svg">Read</p>
            </div>
        </div>
      </div>
    </section>
</template>

<script>
  export default {
    name: 'PostOverview',
    components: {
     
    },
    data() {
      return {
        isRead: false,
        isFollowed: false,
        IDs: false,
        postInfo: [{ }],
        userInfo: [{ }],
        postUser: [{ }],
      }
    },
    methods: {
        async fetchPostInfo() {
            const res = await fetch(`http://localhost:3000/post`)
            const data = await res.json()
            return data
        },
        async fetchUserInfo() {
            const res = await fetch(`http://localhost:3000/userInfo`)
            const data = await res.json()
            return data
        },
        async userInPost(user, post) {
            if (user.userID == post.userID) {
                console.log('post');
                this.IDs = !this.IDs
            } else {
                this.IDs = false
            }
        }
      
    },
    async created() {
      this.postInfo = await this.fetchPostInfo()
      this.userInfo = await this.fetchUserInfo() 
    },
        
  }

</script>

<style scoped>
 #container {
    height: 50em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #content {
    height: 100%;
    width: 60%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5em;
    background-image: url("../assets/backgrounds/logo_design_random.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .post-general {
    height: 40%;
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