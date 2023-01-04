<template>
    <h4>{{ userInfo[0].firstName }} {{ userInfo[0].lastName }}</h4> <p>{{ userInfo[0].jobPosition }}</p> 
</template>

<script>
export default {
    name: 'UserInfo',
    data(){
        //fetch API for user info 
        return { 
            userInfo: [{
                userID: '',
                firstName: '',
                lastName: '',
                jobPosition: '',
                profilePicture: '',
        }],
        }
    },
    methods: {
        async fetchTest() {
    //        let id =  req.params.id
        const res = await fetch(`http://localhost:3000/userInfo/1`)
        const data = await res.json()
        return data
      },
      
    },
    async created() {
      this.userInfo = await this.fetchTest()
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