<template>
  <div class='post'>
    <h1>post component</h1>
    <a href="#" @click="toggleRead">what</a>
  </div>
</template>

<script>
  export default {
    name: 'RedditPost',
    props: {
      toggleRead: {
        type: Function
      }
    }
  }
</script>

<style scoped>
  .post {
    position: fixed;
    top:68px;
    left:0;
    width:100%;
    height:100%;
    background-color:white;
  }
</style>
