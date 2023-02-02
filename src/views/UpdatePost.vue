<template>
    <Header />
    <section id="container">
        <div id="content">
            <form method="post" @submit.prevent="" novalidate="true" enctype="multipart/form-data">
                <label for="title">Title</label>
                    <input type="text" id="title" name="title" v-model="formData[0].title">
                
                <label for="body">Body</label>
                    <textarea type="text" id="body" name="body" v-model="formData[0].body"></textarea>
               
                    <div id="fake-label"><p>Image</p> </div><img src="../assets/circle-check-solid.svg" v-if="formData[0].image" id="imgOk">
                    <label for="image" id="fake-input">Change file</label> 
                    <input type="file" id="image" name="image" @change="onFile($event)">
                    
                  
                
                <label for="topic">Topic</label>
                    <select id="topic" name="topic" v-model="formData[0].topicID">
                        <option v-for="topic in topicsInfo" :key="topic" v-bind:value="topic.topicID" > {{topic.topicName}}</option>
                    </select>
               
                    <input type="submit" value="Update" class="button" @click="updatePost()" />
            </form>
            <div id="errormsg" v-if="postError">
                <img src="../assets/circle-xmark-regular.svg"><p>Error: </p><p id="error"> {{ errormsg }}</p>
            </div>
        </div>
    </section>
</template>

<script>
  import Header from '../components/Header.vue'
  import VueJwtDecode from 'vue-jwt-decode';
  import axios from 'axios'
  
  export default {
    name: 'CreatePost',
    components: {
      Header,
    },
    data() {
      return {
        postError: false,
        formData: {
            userID: '',
            title: '',
            body: '',
            image: '',
            topicID: ''
        },
        topicsInfo: [{ }],
        file: '',
      }
    },
    methods: {
        onFile(event) {
            this.file = event.target.files[0];
            this.formData.image = this.file;
        },


        async fetchTopicsInfo() {
          const res = await fetch(`http://localhost:3000/topics`)
          const data = await res.json()
          return data
        },

        async fetchPostInfo() {
            let decoded = '';
            let token = localStorage.getItem('token');
            try{
                decoded = VueJwtDecode.decode(token)
            }
            catch(err){
                console.log('token is null: ',err);
                window.location = "http://localhost:8080/auth";
            }
            let userID = JSON.stringify(decoded.userId);

            let url =  window.location.pathname;
            let id = url.split('/').pop();
            const res = await fetch(`http://localhost:3000/post/${id}`)
            const data = await res.json()
            if (userID !== data[0].userID) {
                window.location = "http://localhost:8080/";
            } else {
                return data
            }
            
        },

        async updatePost() {
            let id = this.formData[0].postID;
            console.log(this.formData)
                axios.put(`http://localhost:3000/post/update/${id}`, this.formData[0], {
                    headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(){console.log('ok')})
                .then(function() {window.location = "http://localhost:8080/"; })
                .catch(function(){console.log('nope')})
        }

    },
    async created() {
      this.topicsInfo = await this.fetchTopicsInfo()
      this.formData = await this.fetchPostInfo()
    },
  }
</script>

<style scoped>
#container {
    height: 45em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #content {
    height: 100%;
    width: 55%;
    background-image: url("../assets/backgrounds/no_logo_design.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #FFF7E8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5em;
    border-radius: 20px;
  }

form {
    width: 80%;
    height: 30em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    background-color: #FFD7D7;
    padding: 1.5em;
    border-radius: 20px;
}

label {
    width: 10%;
    height: 1.5em;
    color: black;
    font-family: Sans-Bold;
    font-size: 14px;
}

input {
    width: 100%;
    height: 3.5em;
    display: inline;
    border-style: none;
    outline: none;
    background: white;
    font-family: Sans-Regular;
    color: black;
    border-radius: 20px;
    padding: 0 0.5em 0 0.5em;
}
textarea {
    width: 100%;
    display: inline;
    border-style: none;
    outline: none;
    background: white;
    font-family: Sans-Regular;
    color: black;
    border-radius: 20px;
    border: none;
    overflow: auto;
    outline: none;
    resize: none;
}
#title {
    height: 2em;
    width: 87.5%;
}
#body {
    height: 13em;
    padding: 1em;
}

#image {
   display: none;
}

#fake-label {
    width: 10%;
    display: inline;
    border-style: none;
    outline: none;
    font-size: 0.9em;
    font-family: Sans-Bold;
    color: black;
    border-radius: 20px;
}



#fake-input {
    float: left;
    width: 20%;
    margin-left: 0.5em;
    margin-right: 56%;
    color: white;
    font-family: Sans-Bold;
    border: 0.3px solid white;
    padding: .3em .6em;
    border-radius: 1em;
    background-color: #FD2D01;
    transition: 1s;
    cursor:pointer; 
    display: flex;
    align-items: center;
    justify-content: center;
}

#imgOk {
    float: left;
    width: 3%;
    height: 0.9em;
    display: flex;
}

input[type=file] {
    display: none;
}


img {
    width: 3em;
    height: 3em;
}

#topic {
    display: block;
    height: 2em;
    width: 80%;
    margin-left: 1em;
    cursor:pointer; 
}


.button {
    width: 20%;
    height: 2.5em;
    border-style: none;
    padding: 0;
    color: white;
    border-radius: 10px;
    font-family: Sans-Bold;
    background-color: #FD2D01;
    cursor:pointer; 
}

#errormsg {
    background-color: rgba(242, 51, 51, 0.937);
    color: white;
    padding-left: 2em;
    display: flex;
    flex-flow: row;
    align-items: center;
}

#errormsg img {
    height: 1em;
    width: 1em;
    padding: 0.5em;
    filter: invert(1);
}

#error {
    padding: 0 1em 0 1em;
}
</style>