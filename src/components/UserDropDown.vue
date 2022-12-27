<template>
    <div id="drop-down">
        <a href="#" class="drop-down-option">Profile</a>
        <a href="#" class="drop-down-option">Favourite Posts</a>
        <a href="#" class="drop-down-option">Configuration</a>
        <a href="#" class="drop-down-option">Log out</a>
    </div>
</template>

<script>
export default {
    name: 'UserDropDown',

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
    width: 100%;
    height: 1.5em;
    padding-left: 0.3em;
    text-decoration: none;
    color: black;
    font-size: 0.9em;
    border-style: solid;
    border-width: 0.1em;
    border-color: #EBE8E8;
}
</style>