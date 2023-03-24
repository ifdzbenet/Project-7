<template>
    <a @click="toHome()"><img src="../assets/arrow-left-solid.svg"></a>
</template>

<script>
export default {
    name: 'GoBack',
    methods: {
        toHome() {
        window.location = `http://localhost:8080/`;
      },
      
    },    
}
</script>

<style scoped>
a{
    border-radius: 100%;
    width: 3em;
    height: 3em;
    background-color: #FD2D01;
    position: absolute;
    top: 6em;
    left: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer; 
}

img {
 width: 1em;
 height: 1em;
 filter: invert(100%);
}

@media only screen and (max-width: 800px) {
    a {
    width: 2em;
    height: 2em;
    top: 3.5em;
    left: 1.5em;
    }
}
</style>