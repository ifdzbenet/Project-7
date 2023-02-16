<template>
    <Header />
    <section id="container">
        <div class="content">
            <a class="dropdown-button" @click="toggleEmailDropDown()">
                <span class="selection-box">
                    Change e-mail
                    <img class="arrow" src="../assets/chevron-down-solid.svg"  v-if="!emailDropDown">
                    <img class="arrow" src="../assets/chevron-up-solid.svg" v-if="emailDropDown">
                </span>
            </a>
            <div class="dropdown" v-if="emailDropDown">
                <form method="post" @submit.prevent="" novalidate="true">
                    <label for="email">Current e-mail</label>
                        <input type="text" class="input" name="email" v-model="email.email">
                    <label for="newEmail">New e-mail</label>
                        <input type="text" class="input" name="newEmail" v-model="email.newEmail">
                    
                        <input type="submit" value="Change e-mail" class="button" @click="changeEmail()" />
                </form>
            </div>
            
            <a class="dropdown-button" @click="togglePWDropDown()">
                <span class="selection-box">
                    Change password
                    <img class="arrow" src="../assets/chevron-down-solid.svg"  v-if="!passwordDropDown">
                    <img class="arrow" src="../assets/chevron-up-solid.svg" v-if="passwordDropDown">
                </span >
            </a>
            <div class="dropdown" v-if="passwordDropDown">
                <form method="post" @submit.prevent="" novalidate="true">
                    <label for="password">Current password</label>
                        <input type="password" class="input" name="password" v-model="password.password">
                   <label for="newPW">New password</label>
                        <input type="password" class="input" name="newPW" v-model="password.newPW">
                    <label for="repeatPW">Repeat new password</label>
                        <input type="password" class="input" name="repeatPW" v-model="password.repeatPW">

                        <input type="submit" value="Change password" class="button" @click="changePassword()" />
                </form>
            </div>
            
            <a class="dropdown-button" @click="toggleDeleteDropDown()">
                <span class="selection-box">
                    Delete account
                    <img class="arrow" src="../assets/chevron-down-solid.svg"  v-if="!deleteDropDown">
                    <img class="arrow" src="../assets/chevron-up-solid.svg" v-if="deleteDropDown">
                </span></a>
            <div class="dropdown" v-if="deleteDropDown">
                <span id="delete-container">
                <p id="deletemsg">Do you want to delete your account?</p>
                <button class="button cancel"  @click="promptDelete()">Delete Account</button>
                </span>
            </div>
            <div id="deletePrompt" v-if="deletePrompt">
                <div id="delete-msg">Are you sure you want to delete your account? Including all your posts and personal information
                  <div class="button-box">
                  <button class="button cancel" @click="deleteUser()">Delete</button>
                  <button class="button delete" @click="promptDelete()">Cancel</button>
                </div>
                </div>
            </div>   
            
        </div>
    </section>
</template>

<script>
import Header from '../components/Header.vue'
import VueJwtDecode from 'vue-jwt-decode';
  import axios from 'axios'

export default {
    name: 'Configuration',
    components: {
      Header,
    },
    data(){
      return { 
        email: {
            userID: '',
            email: '',
            newEmail: ''
        },
        password: {
            userID: '',
            password: '',
            newPW: '',
            repeatPW: ''
        },
        emailDropDown: false,
        passwordDropDown: false,
        deleteDropDown: false,
        deletePrompt: false,
      }
    },
    methods: {
      toggleEmailDropDown() {
        this.emailDropDown = !this.emailDropDown
      },
      togglePWDropDown() {
        this.passwordDropDown = !this.passwordDropDown
      },
      toggleDeleteDropDown() {
        this.deleteDropDown = !this.deleteDropDown
      },
      promptDelete() {
        this.deletePrompt = !this.deletePrompt
      },
      async deleteUser() {
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
       await axios.delete(`http://localhost:3000/deleteUser/${id}`)
          .then(function() {window.location = "http://localhost:8080/auth"; })
          .then(function() {localStorage.removeItem('token')})
          .catch(function(){console.log('nope')})
      },
      async changeEmail() {
        let decoded = '';
            let token = localStorage.getItem('token');
            try{
              decoded = VueJwtDecode.decode(token)
            }
            catch(err){
              console.log('token is null: ',err);
              window.location = "http://localhost:8080/auth";
            }
        this.email.userID = JSON.stringify(decoded.userId);
        axios.put(`http://localhost:3000/updateEmail`, this.email)
            .then(function(){console.log('ok')})
            .then(function() {window.location = "http://localhost:8080/"; })
            .catch(function(){console.log('nope')})
      },
      async changePassword() {
        let decoded = '';
            let token = localStorage.getItem('token');
            try{
              decoded = VueJwtDecode.decode(token)
            }
            catch(err){
              console.log('token is null: ',err);
              window.location = "http://localhost:8080/auth";
            }
        this.password.userID = JSON.stringify(decoded.userId);
        if (this.email.newPW == this.email.repeatPW) {
        axios.put(`http://localhost:3000/updatePassword`, this.password)
            .then(function(){console.log('ok')})
            .then(function() {window.location = "http://localhost:8080/"; })
            .catch(function(){console.log('nope')})
        } else {
            console.log('passwords dont match')
        }
      }
    }
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
    padding: 5em 0 5em 0;
}

.dropdown-button {
    width: 50%;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    cursor:pointer; 
}

.arrow {
  width: 1em;
  height: 1em;
  
}

.selection-box {
    margin-top: -1px;
    width: 100%;
    height: 3em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-color: #FFC90E;
    border-style: solid;
    border-width: 0.5px 0 0.5px 0;
}

.dropdown {
    width: 50%;
    height: auto;
    background-color: white;
    
}

.dropdown form {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0.5em;
}

label {
    margin: 0.3em;
    width: 30%;
    height: 1.5em;
    color: black;
    font-family: Sans-Bold;
    font-size: 14px;
}

input {
    width: 50%;
    height: 1.5em;
    display: inline;
    margin: 0.8em;
    border-style: none;
    outline: none;
    background: #FFC90E;
    color: white;
    font-family: Sans-Regular;
    color: black;
    border-radius: 20px;
    padding: 0 0.5em 0 0.5em;
}

#delete-container {
    height: 7em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#deletemsg {
    font-family: Sans-Bold;
    font-size: 14px;
}

.button {
    width: 40%;
    height: 2.5em;
    border-style: none;
    padding: 0;
    color: white;
    border-radius: 10px;
    font-family: Sans-Bold;
    background-color: #FD2D01;
    cursor:pointer; 
}

.cancel {
  background-color: #FD2D01;
  color: white;
}

.delete {
  background-color: #FFD7D7;
  color: #FD2D01;
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

.button-box {
width: 80%;
display: flex;
justify-content: space-evenly;
}

@media only screen and (max-width: 800px) {
  .content {
      height: 100%;
      width: 90%;
      font-size: 0.9em;
  }
  .dropdown-button {
      width: 90%;
  }
  .dropdown {
      width: 90%;
  }
  #deletePrompt {
    top: 40%;
    left: 50%;
    width: 90%;
    height: 60%;
  }
}

</style>