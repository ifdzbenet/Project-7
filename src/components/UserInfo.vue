<template>
    <h4>{{ userInfo[0].firstName }} {{ userInfo[0].lastName }}</h4> <p>{{ userInfo[0].email }}</p> 
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'; //to decrypt the key from local storage
export default {
    name: 'UserInfo',
    data(){
        //fetch API for user info 
        return { 
            userInfo: [{}],
        }
    },
    methods: {
        // fetch information about the logged user from the database
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
            let id = JSON.stringify(decoded.userId);
        const res = await fetch(`http://localhost:3000/userInfo/${id}`)
        const data = await res.json()
        return data
      },
      
    },
    // Using the fetched data to set it into the data storage for use in creation of the page
    async created() {
      this.userInfo = await this.fetchUserInfo()
    },
    
}
</script>

<style scoped>
h4 {
    font-size: 1em;
    margin: 0;
}

p {
    font-size: 0.8em;
    margin: 0;
}
</style>