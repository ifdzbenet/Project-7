<template>
    <div id="content-box">
        <button @click="toCreatePost">Create a post</button>
        <ul id="topic-list" v-for="topic in topics" :key="topic">
            <li class="list"><a @click="linkToTopicPage(topic.topicID)">{{ topic.topicName }}</a></li>
        </ul>
    </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'; //to decrypt the key from local storage
export default {
    name: 'SideContent',
    components: {
    },
    data() {
        return {
            topics: [{}],
            userPostInfo: [{}],
        }
    },
    methods: {
      // Redirects the user into the page to create a new post
      toCreatePost() {
        window.location = `http://localhost:8080/post/create-post`;
        },

      // fetches the information from the database
      async fetchTopicsInfo() {
          const res = await fetch(`http://localhost:3000/topics`)
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
      //not implemented for this version
      linkToTopicPage(id) {
        window.location = `http://localhost:8080/topic/${id}`;
      }

    },
    // Using the fetched data to set it into the data storage for use in creation of the page
    async created() {
      this.topics = await this.fetchTopicsInfo()
      this.userPostInfo = await this.fetchUserPostInfo()
    },

}
</script>

<style scoped>
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

a {
    padding: 0.3em 0.2em 0.3em 0.2em;
    border-radius: 10px;
    cursor:pointer; 
}

a:hover {
    color: #FD2D01;
    text-decoration-line: underline;
    text-decoration-color: white;  
}
</style>