<template>
    <form method="post">
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email"><br>

        <label for="password">Password</label>
        <input type="text" id="password" name="password"><br>
        
        <input type="submit" value="Submit">
    </form>
</template>

<script>
export default {
    name: 'LogInForm',

}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
}
</style>