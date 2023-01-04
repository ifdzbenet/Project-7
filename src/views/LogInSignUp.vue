<template>
    <div id="container">
        <div id="logo-block" href="">
            <img src="../assets/logos/icon-left-font.png">
        </div>
        <div id="content">
            <div id="button-container">
                <button id="sign-up" @click="turnSignUp()" :class="{selectedButton: showSignUp}">
                    <p>Sign up</p>
                </button>
                <button id="log-in" @click="turnLogIn()" :class="{selectedButton: showLogIn}">
                    <p>Log in</p>
                </button>
            </div>
            <div id="form-body">
                <div id="form-sign-up" v-if="showSignUp">
                    <SignUpForm />
                </div>
                <div id="form-log-in" v-if="showLogIn"> 
                    <LogInForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm.vue'
import LogInForm from '../components/LogInForm.vue'

export default {
    name: 'LogInSignUp',
    components: {
        SignUpForm,
        LogInForm
    },
    data(){
        return { 
          //Boolean to show the drop down
          showLogIn: true,
          showSignUp: false,
        }
    },
    methods: {
    turnLogIn() {
        this.showSignUp = false
        this.showLogIn = true
    },
    turnSignUp() {
        this.showSignUp = true
        this.showLogIn = false
    },
    }
}
</script>

<style scoped>
#logo-block {
  width: 16em;
  height: 3.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 40%;
  box-shadow: 0 2px 4px 0 #FFC90E, 0 6px 20px 0 rgba(0,0,0,0.19);
}
#logo-block img {
  width: 17.5em;
  height: 2.5em;
  overflow: hidden;
  object-fit: cover;
  border-radius: 43%;
}

#container {
    margin-top: 5em;
    height: 35em;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#container #content {
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

#button-container {
    height: 11%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: none;
}
button {
    width: 50%;
    height: 100%;
    border-style: none;
    border-left-style: solid;
    border-left-width: 0.1;
    border-left-color: grey;
    border-right-style: solid;
    border-right-width: 0.1;
    border-right-color: grey;
    background-color: rgb(233, 233, 233);
    padding: 0;
}
.selectedButton {
    border-color: white;
    background-color: white;
}

button:hover {
    border-color: white;
    background-color: white;
}


#form-body {
    background-color: white;
    padding: 1.5em;
    height: 70%;
}
</style>