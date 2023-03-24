<template>
    <div id="drop-down">
        <a @click="toProfile()" class="drop-down-option">Edit Profile</a>
        <a @click="toConfiguration()" class="drop-down-option">Configuration</a>
        <a @click="logOut()" class="drop-down-option">Log out</a>
    </div>
</template>

<script>
export default {
    name: 'UserDropDown',
    methods: {
        //function to log out, it removes the key from the local storage, and redirects the user to the authentification page
        //there is no way for the user to be logged in afterwards
        logOut() {
            localStorage.removeItem('token')
            window.location = "http://localhost:8080/auth";
        },
        // Redirects the user into the edit profile page
        toProfile() {
            window.location = "http://localhost:8080/profile";
        },
        // Redirects the user into the configuration page
        toConfiguration() {
            window.location = "http://localhost:8080/configuration";
        }
      
    },
}
</script>

<style scoped>
#drop-down {
    width: 17%;
    height: auto;
    position: absolute;
    top: 3em;
    right: 0;
    display: flex;
    flex-flow: column;
    align-items: flex-start;

}

.drop-down-option {
    cursor:pointer;  
    width: 100%;
    height: 1.5em;
    padding-left: 1em;
    text-decoration: none;
    color: black;
    font-size: 0.9em;
    border-style: solid;
    border-width: 0.1em;
    border-color: #EBE8E8;
}

@media only screen and (max-width: 800px) {
    #drop-down {
    width: 40%;
}
}
</style>