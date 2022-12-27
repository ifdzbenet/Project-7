<template>
  <Header />
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: Sans-Regular;
  src: url(./assets/fonts/static/OpenSans/OpenSans-Regular.ttf);
}
@font-face {
  font-family: Sans-Bold;
  src: url(./assets/fonts/static/OpenSans/OpenSans-Bold.ttf);
}
@font-face {
  font-family: Sans-SemiBold;
  src: url(./assets/fonts/static/OpenSans/OpenSans-SemiBold.ttf);
}
@font-face {
  font-family: Sans-Italic;
  src: url(./assets/fonts/static/OpenSans/OpenSans-Italic.ttf);
}
  body {
    margin: 0;
    background-color: #FFF7E8;
    align-items: center;
    font-size: 1em;
    font-family: Sans-Regular;
  }
</style>
