<template>
  <section class='post'>
    <main>
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
    </main>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RedditPost',
    mounted () {
      this.getComments()
    },
    methods: {
      getComments () {
        // let that = this
        axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/comments', {
          params: {
            commentID: '7tw6hi'
          }
        })
          .then(function (response) {
            console.log('comments data')
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
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
    z-index:2;
    width:100%;
    height:100%;
    background-color:white;
  }
  h1 {
    font-size:50px;
  }
</style>
