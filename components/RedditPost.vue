<template>
  <div class='post'>
    <button @click='toggleRead'>back</button>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>post component</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
    <h1>xxx what</h1>
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
    overflow:auto;
    position:fixed;
    opacity:1;
    top:66px;
    left:0;
    width:100%;
    height:100%;
    background-color:white;
  }
  h1 {
    font-size:30px;
  }
</style>
