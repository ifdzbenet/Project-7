<template>
    <form method="post">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name"><br>

        <label for="second-name">Second Name</label>
        <input type="text" id="second-name" name="second-name"><br>

        <label for="email">E-mail</label>
        <input type="email" id="email" name="email"><br>

        <label for="password">Password</label>
        <input type="text" id="password" name="password"><br>
                    
        <input type="submit" value="Submit">
    </form>
</template>

<script>
export default {
    name: 'SignUpForm',

}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
}
</style>