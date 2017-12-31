<template>
  <div>
    <h1 class='text'>displaying weather</h1>
    <input v-model="question">
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'WeatherPanel',
    data () {
      return {
        test: 'haha',
        question: 'haha'
      }
    },
    computed: {
      posLat () {
        return this.$store.state.pos.lat
      }
    },
    watch: {
      posLat: function (newPos, oldPos) {
        console.log('changed')
        axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/weather')
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
  .text {
    color:black;
  }
</style>
