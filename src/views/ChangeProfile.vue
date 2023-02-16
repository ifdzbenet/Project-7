<template>
    <Header />
    <section id="container">
        <div id="content">
            <form method="post" @submit.prevent="" novalidate="true" enctype="multipart/form-data">
                <label for="firstName">First Name</label>
                    <input type="text" class="input" name="firstName" v-model="formData[0].firstName">

                <label for="lastName">Last Name</label>
                    <input type="text" class="input" name="lastName" v-model="formData[0].lastName">
                
                <label for="jobPosition">Job position</label>
                    <input type="text" class="input" name="jobPosition" v-model="formData[0].jobPosition">
               
                    <div id="fake-label"><p>Profile picture</p> </div><img src="../assets/circle-check-solid.svg" v-if="this.formData[0].profilePicture" id="imgOk">
                    <label for="profilePicture" id="fake-input">Change file</label> 
                    <input type="file" id="profilePicture" name="profilePicture" @change="onFile($event)">
               
                    <input type="submit" value="Update" class="button" @click="updateProfile()" />
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
        name: 'ChangeProfile',
        components: {
            Header
        },
        data() {
            return {
                postError: false,
                formData: [{
                    userID: '',
                    firstName: '',
                    lastName: '',
                    jobPosition: '',
                    profilePicture: ''
                }],
                file: '',
            }
        },
        methods: {
            onFile(event) {
                console.log(this.formData[0])
            this.file = event.target.files[0];
            this.formData[0].profilePicture = this.file;
            console.log(this.formData[0].profilePicture)
            console.log(this.formData[0])
        },


        async fetchTopicsInfo() {
          const res = await fetch(`http://localhost:3000/topics`)
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
                console.log('token is null: ',err);
                window.location = "http://localhost:8080/auth";
            }
            let userID = JSON.stringify(decoded.userId);

            const res = await fetch(`http://localhost:3000/userInfo/${userID}`)
            const data = await res.json()
            if (userID != data[0].userID) {
                window.location = "http://localhost:8080/";
            } else {
                return data
            }
            
        },

        async updateProfile() {
            let id = this.formData[0].userID;
            console.log(this.formData[0])
                axios.put(`http://localhost:3000/updateProfile/${id}`, this.formData[0], {
                    headers: { 'Content-Type': 'multipart/form-data'}})
                .then(function(){console.log('ok')})
                .then(function() {window.location = "http://localhost:8080/"; })
                .catch(function(){console.log('nope')})
        }
        },
        async created() {
        this.formData = await this.fetchUserInfo()
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
    background-image: url("../assets/backgrounds/welcome_design.png");
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
    width: 15%;
    height: 1.5em;
    color: black;
    font-family: Sans-Bold;
    font-size: 14px;
}

input {
    width: 80%;
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
.input {
    height: 2em;
    width: 79%;
}


#fake-label {
    width: 20%;
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
    width: 17%;
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

@media only screen and (max-width: 800px) {
    #content {
        height: 100%;
        width: 90%;
    }
    form {
        width: 75%;
        height: 33em;
        padding: 1.5em;
        justify-content: space-between;
    }
    #fake-label {
        width: 20%;
    }

    #fake-input {
        float: left;
        width: 20%;
        margin-right: 45%;
    }
    label {
        width: 35%;
    }
    .input {
        height: 2em;
        width: 55%;
    }
}
</style>