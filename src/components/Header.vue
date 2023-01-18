<template>
    <header>
        <div>
            <a id="logo-block" href="">
                <img src="../assets/logos/icon-left-font.png">
            </a>
            <form id="search-bar">
                <input type="text" placeholder="Search" name="search">
                <button><img src='../assets/magnifying-glass-solid.svg' id="icon"></button>
            </form>
            <a href="#" id="drop-down-user" @click="toggleDropDown()" >
                <img id="user-icon" src="../assets/placeholder-user-icon.svg">
                <div id="user-info">
                  <UserInfo />
                </div>
                <img id="arrow" src="../assets/chevron-down-solid.svg">
            </a>
        </div>
        <UserDropDown v-show="showDropDown"/>
        </header>
</template>

<script>
import UserDropDown from './UserDropDown.vue'
import UserInfo from './UserInfo.vue'

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
        }
    },
    methods: {
      toggleDropDown() {
        this.showDropDown = !this.showDropDown
      },
    },
        
  }

</script>

<style scoped>

header{
  position: relative;
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
}
#logo-block img {
  width: 17.5em;
  height: 2.5em;
  overflow: hidden;
  object-fit: cover;
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
}
#drop-down-user #user-icon {
  width: 2em;
  height: 2em;
  border-radius: 100%;
}

#drop-down-user #user-info {
  width: auto;
  height: 2.5em;
  margin: 0 0.5em 0 0.5em;
  font-size: 0.9em;
  font-family: Sans-SemiBold;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}

#drop-down-user #arrow {
  width: 0.6em;
  height: 0.8em;
}

</style>