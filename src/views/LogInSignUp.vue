<template>
    <div id="container">
        <div id="content">
            <div id="welcome-message">
                <h2>Welcome to the</h2>
                <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="Groupomania"> 
                <h1>Internal Social Network</h1>
            </div>
            <div id="form-body">
                <div id="form-sign-up" v-if="showSignUp">
                    <form method="post">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name">
                        <div class="fake_hr"></div>
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name"  name="last-name">
                        <div class="fake_hr"></div>
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email">
                        <div class="fake_hr"></div>
                        <label for="password">Password</label>
                        <input type="text" id="password" name="password">
                        <div class="fake_hr"></div>
                        <input type="submit" value="Submit" class="button">
                    </form>
                    <p>Already have an account?<button class="toggle_button" @click="turnLogIn()">Log in</button></p>
                </div>
                <div id="form-log-in" v-if="showLogIn"> 
                    <form method="post">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email">
                        <div class="fake_hr"></div>
                        <label for="password">Password</label>
                        <input type="text" id="password" name="password">
                        <div class="fake_hr"></div>
                        <input type="submit" value="Submit" class="button nottransparent">
                    </form>
                    <p>Need an account? <button class="toggle_button" @click="turnSignUp()">Sign up</button></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LogInSignUp',
    components: {

    },
    data(){
        return { 
          //Boolean to show the drop down
          showLogIn: true,
          showSignUp: false,
          //welcomeMessage = true
        }
    },
    methods: {
    turnLogIn() {
        this.showSignUp = false
        this.showLogIn = true
        //this.welcomeMessage = false
    },
    turnSignUp() {
        this.showSignUp = true
        this.showLogIn = false
        //this.welcomeMessage = false
    },
    }
}
</script>

<style scoped>

p {
    margin: 0;
    font-size: 14px;
    color: black;
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
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-image: url("../assets/backgrounds/welcome_design.png");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
}

#welcome-message {
    width: 100%;
    height: 30%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#welcome-message img {
    width: 70%;
}
#welcome-message h1 {
    width: 90%;
    padding-top: 20px;
    margin: 0;
    font-size: 20px;;
    display: flex;
    overflow: hidden;
    justify-content: center;
}

.button {
    width: 35%;
    height: 2.5em;
    border-style: none;
    padding: 0;
    background-color: white;
    border-radius: 10px;
    font-family: Sans-Bold;
    color: #FD2D01;
}

.toggle_button {
    width: 3.8em;
    height: 2.5em;
    border-style: none;
    padding: 0;
    background: transparent;
    font-family: Sans-Bold;
    color: #fff7E8;
}
.selectedButton {
    border-color: white;
    background-color: white;
}


#form-body {
    padding: 0 20px 0 20px;
    height: 60%;
}

#form-log-in {
    height: 70%;
}

#form-sign-up {
    height: 100%;
}

form {
    height: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

label {
    float: left;
    width: 30%;
    height: 1.5em;
    display: inline;
    color: white;
    font-family: Sans-Bold;
    font-size: 14px;
}

input {
    float: left;
    width: 50%;
    height: 1.5em;
    display: inline;
    border-style: none;
    outline: none;
    background: transparent;
    font-family: Sans-Regular;
    color: #fff7E8;
}



.nottransparent {
    background: white;
}

.fake_hr {
    width: 100%;
    height: 2px;
    background-color: white;
    margin-top: -15px;
}
</style>