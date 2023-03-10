<template>
  <div id="content-box">
        <button @click="toCreatePost">Create a post</button>
        <ul id="topic-list" v-for="topic in topics" :key="topic">
            <li class="list"><a class="topic-link" @click="filterChange(topic.topicID)">{{ topic.topicName }}</a></li>
        </ul>
        <div id="filter" v-if="resetFilter" a @click="setFilter()"> <a>Reset filters</a></div>
  </div>
    <section id="container">
      <div id="content">
        <ul id="test" v-for="post in postInfo" :key="post" v-show="this.filter.includes(`${post.topicID}`)">
        <li class="post-general" v-if="this.filter.includes(`${post.topicID}`)">
          <div class="user-info">
            <span><img v-bind:src="`../image/${post.profilePicture}`">{{post.firstName}} <p>{{post.jobPosition}}</p></span>
          </div>
          <a @click="linkToPost(post.postID)">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-body-preview"><p>{{ post.body }}</p></div>
          </a>
          <a class="post-image" @click="linkToPost(post.postID)">
            <img v-if="post.image !== ''" v-bind:src="`image/${post.image}`">
            <div class="iframe-container" v-if="post.image == ''">
              <iframe v-bind:src="`${embedURL(post.multimedia)}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </a>
          <div class="topic">Topic: <a @click="linkToTopicPage(post.topicID)"> {{ post.topicName }}</a></div>
          <div class="read-status">
            <p v-if="!this.placeholder.includes(`${post.postID}`)"><img src="../assets/bookmark-solid.svg">Unread</p>
            <p v-else><img src="../assets/bookmark-regular.svg">Read</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
</template>

<script>
import SideContent from '../components/SideContent.vue'
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios'
  export default {
    name: 'PostOverview',
    components: {
     SideContent,
    },
    data() {
      return {
        isRead: false,
        isFollowed: false,
        newFollowed: false,
        postInfo: [{ }],
        userPostInfo: [{ }],
        placeholder: '',
        topics: [{}],
        filter: [],
        resetFilter: false,
        embed: ''
      }
    },
    methods: {
      async fetchPostInfo() {
          const res = await fetch(`http://localhost:3000/post`)
          const data = await res.json()
          return data
      },

      async fetchTopicsInfo() {
          const res = await fetch(`http://localhost:3000/topics`)
          const data = await res.json()
          return data
        },

      async fetchReadStatus() {
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
        const res = await fetch(`http://localhost:3000/getReadStatus/${id}`)
        const data = await res.json()
        return data
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
        let readPosts = this.placeholder
        if (!readPosts.includes(`${id}`)) {
          readPosts.push(id)
          let update = readPosts.toString()
          let JSON = {"update": update}
          this.userPostInfo[0].readPosts = readPosts
          await axios.post(`http://localhost:3000/sendReadStatus/${userid}`, JSON)
            .catch(error => console.log(error))
            window.location = `http://localhost:8080/post/${id}`;
        } else {
          console.log('its already there');
            window.location = `http://localhost:8080/post/${id}`;
        }
      },
      filterChange(id) {
        this.filter = [`${id}`];
        this.resetFilter = true
      },
      splitArray() {
        this.placeholder = this.userPostInfo[0].read_status.split(',')
      },
      toCreatePost() {
        window.location = `http://localhost:8080/post/create-post`;
      },
      setFilter() {
        let test = ''
        for (let i = 0; i < 3; i++) {
          test += this.topics[i].topicID + '';
        }
        this.filter = test.split('')
        this.resetFilter = false
      },

      embedURL(url) {
        let splitUrl = url.split('/')
        let middleSplit = splitUrl[3].split('=')
        let videoCode = middleSplit[1].split('&')
        return "https://www.youtube.com/embed/" + videoCode[0]
      }
    },
    async created() {
      this.userPostInfo = await this.fetchReadStatus()
      this.postInfo = await this.fetchPostInfo()
      this.topics = await this.fetchTopicsInfo()
      this.setFilter()
      this.splitArray()
    },
   
        
  }

</script>

<style scoped>

.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 0%;
  height: 12em;
}
.iframe-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
}

#filter {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  font-size: 0.9em;
  width: 100%;
  padding: 0.5em;
  background-color: #fd2b0168;
}

#content-box {
    position: fixed;
    left: 2em;
    top: 7em;
    width: 17%;
    height: auto;
    border: solid #FFD7D7 1px;
    box-shadow: 2px 2px 10px #ffd7d7e0;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
}

button {
  cursor:pointer; 
  width: 95%;
  height: 2.5em;
  border-style: none;
  padding: 0;
  color: white;
  border-radius: 10px;
  font-family: Sans-Bold;
  background-color: #FD2D01;
}

#topic-list {
    list-style-type: none;  
    font-size: 0.9em; 
    margin: 0;
    padding: 0.5em 0 0.5em 0;
}

.topic-link {
    padding: 0.3em 0.2em 0.3em 0.2em;
    border-radius: 10px;
    cursor:pointer; 
}

  .topic-link:hover {
    color: #FD2D01;
  }
  
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
    padding-top: 2.5em;
    display: flex;
    flex-direction: column-reverse;
  }

  #test {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.5em;
    padding: 0;
  }

  .post-general {
    height: 23em;
    width: 85%;
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

  @media only screen and (max-width: 800px) {
    #content-box {
      position: static;
      padding: 3.5em 0 0.5em 0;
      width: 100%;
      font-size: 0.9em;
      display: flex;
      align-items: center;
    }

    button {
      width: 70%;
      height: 2em;
    }

    #topic-list {
      font-size: 0.9em; 
        margin: 0;
        padding: 0;
    }

    #content {
      width: 90%;
      padding-top: 0;
    }
    .post-general {
      width: 75%;
    }
    .post-title {
      width: 85%;
    }
    .post-body-preview {
      width: 85%;
    }
  }
</style>