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
                    <label for="newPW">Repeat new password</label>
                        <input type="password" class="input" name="newPW" v-model="password.newPW">
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
                <div id="delete-msg">Are you sure you want to delete your account?
                  <div class="button-box">
                  <button class="button cancel" @click="deletePost()">Delete</button>
                  <button class="button delete" @click="promptDelete()">Cancel</button>
                </div>
                </div>
            </div>   
            
        </div>
    </section>
</template>

<script>
import Header from '../components/Header.vue'
export default {
    name: 'Configuration',
    components: {
      Header,
    },
    data(){
      return { 
        email: {
            email: '',
            newEmail: ''
        },
        password: {
            password: '',
            newPW: ''
        },
        post: [{ }],
        user: [{}],
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
      async deletePost() {
        /*let id = this.post[0].postID;
       axios.delete(`http://localhost:3000/post/${id}`)
          .then(function(){console.log('ok')})
          .then(function() {window.location = "http://localhost:8080/"; })
          .catch(function(){console.log('nope')})*/
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
    height: 6em;
    background-color: white;
    
}

.dropdown form {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.5em;
}

label {
    margin: 0.3em;
    width: 25%;
    height: 1.5em;
    color: black;
    font-family: Sans-Bold;
    font-size: 14px;
}

input {
    width: 60%;
    height: 1.5em;
    display: inline;
    margin: 0.3em;
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
    display: flex;
    flex-direction: column;
    align-items: center;
}

#deletemsg {
    font-family: Sans-Bold;
    font-size: 14px;
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
width: 15em;
display: flex;
justify-content: space-evenly;
}

</style>