<template>
    <form method="post">
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email">

        <label for="password">Password</label>
        <input type="text" id="password" name="password">
        
        <input type="submit" value="Submit" class="button">
    </form>
</template>

<script>
export default {
    name: 'LogInForm',

}
</script>

<style>
form {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.button {
    width: 35%;
    height: 2.5em;
    border-style: none;
    padding: 0;
    border-radius: 10px;
    font-family: Sans-Bold;
    color: #FD2D01;
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
}
</style>