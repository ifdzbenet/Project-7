<template>
    <header>
        <div>
            <a id="logo-block" @click="toHome()">
                <div id="logo"></div>
            </a>
            <form id="search-bar">
                <input type="text" placeholder="Search" name="search">
                <button><img src='../assets/magnifying-glass-solid.svg' id="icon"></button>
            </form>
            <a id="drop-down-user" @click="toggleDropDown()" >
                <img id="user-icon" v-bind:src="`../image/${userInfo[0].profilePicture}`" v-if="userInfo[0].profilePicture !== undefined">
                <img id="user-icon" src='../assets/placeholder-user-icon.svg' v-if="userInfo[0].profilePicture === undefined">
                <div id="user-info">
                  <h4>{{ userInfo[0].firstName }} {{ userInfo[0].lastName }}</h4> <p>{{ userInfo[0].email }}</p>
                </div>
                <img class="arrow" src="../assets/chevron-down-solid.svg"  v-if="!showDropDown">
                <img class="arrow" src="../assets/chevron-up-solid.svg" v-if="showDropDown">
            </a>
        </div>
        <UserDropDown v-if="showDropDown"/>
        </header>
</template>

<script>
import UserDropDown from './UserDropDown.vue'
import UserInfo from './UserInfo.vue'
import VueJwtDecode from 'vue-jwt-decode';

  export default {
    name: 'Header',
    components: {
      UserDropDown,
      UserInfo
    },
    data(){
        return { 
          //Boolean to show the drop down
          showDropDown: false,
          userInfo: [{}],
        }
    },
    methods: {
      toggleDropDown() {
        this.showDropDown = !this.showDropDown
      },
      toHome() {
        window.location = `http://localhost:8080/`;
      },
      async undefined() {
        
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
            let id = JSON.stringify(decoded.userId);
        const res = await fetch(`http://localhost:3000/userInfo/${id}`)
        const data = await res.json()
        return data
      },
    },
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

header{
  width: 100%;
  position: fixed;
  z-index:1;
  box-shadow: 2px 2px 20px #eeddbd85;
}

header div {
  width: auto;
  height: 3em;
  background-color: #FFFFFF;
  display: flex;
  flex-wrap: wrap;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;  
}

div {
  align-items: center;
}
#logo-block {
  width: 20%;
  height: 2.5em;
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor:pointer; 
}
#logo {
  width: 17.5em;
  height: 2.5em;
  background-image: url("../assets/logos/icon-left-font.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


#search-bar {
  width: 60%;
  height: 2em;
  padding-left: 0.5em;
  padding-right: 0.2em;
  align-items: center;
  color: #FFFFFF;
  background-color: #FFFFFF;
  border-radius: 3em;
  border-style: solid;
  border-width: 0.1em;
  border-color: #EBE8E8;
  align-items: center;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
#search-bar input {
  height: 2em;
  width: 100%;
  border: none;
  background-color: inherit;
  border-radius: inherit;
  outline: none;
}
#search-bar button {
  width: 2em;
  height: 2em;
  padding: 0;
  border-style: none;
  border-radius: inherit;
  background-color: inherit;
}
#search-bar button #icon {
  padding: 0.1em;
  width: 1.3em;
  height: 1.3em;
  font-size: 1em;
}

#drop-down-user {
  width: 15%;
  height: 2em;
  padding: 0 1em 0 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #000;
  cursor:pointer; 
}
#drop-down-user #user-icon {
  width: 2em;
  height: 2em;
  border-radius: 100%;
}

#drop-down-user #user-info {
  display: block;
  width: auto;
  height: 2.5em;
  margin: 0 0.5em 0 0.5em;
  font-size: 0.9em;
  font-family: Sans-SemiBold;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}

#drop-down-user .arrow {
  width: 0.6em;
  height: 0.8em;
}

@media only screen and (max-width: 800px) {
  
  #logo-block {
    width: 15%;
  }

  #logo {
    margin-left: 0.5em;
    width: 3.5em;
    height: 3em;
    background-image: url("../assets/logos/icon.png");
    overflow: hidden;
    object-fit: cover;
  }

  #search-bar {
    width: 55%;
  }

  #drop-down-user{
    width: 12%;
    font-size: 0.9em;
  }

  #user-info {
    visibility: hidden;
    width: 1em;
  }

  #user-info h4{
    width: 0;
  }
  #user-info p{
    width: 0;
  }
}

</style>