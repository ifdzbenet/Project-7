<template>
    <h4>{{ test[0].firstName }} {{ test[0].lastName }}</h4> <p>{{ test[0].jobPosition }}</p> 
</template>

<script>
export default {
    name: 'UserInfo',
    data(){
        //fetch API for user info 
        return { 
            test: [{
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
        const testing = await res.json()
        return testing
      },
      
    },
    async created() {
      this.test = await this.fetchTest()
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