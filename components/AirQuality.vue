<template>
  <div>
    <h1 class='text'>displaying weather</h1>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'AirQuality',
    data () {
      return {
        temp: 0,
        summary: 'n/a',
        hourly: 0,
        daily: 0
      }
    },
    computed: {
      posLat () {
        return this.$store.state.pos.lat
      }
    },
    methods: {
      extractData (data) {
        this.temp = data.currently.temperature
        this.summary = data.currently.summary
        this.hourly = data.hourly
        this.daily = data.daily
      }
    },
    watch: {
      posLat: function (newPos, oldPos) {
        console.log('changed')
        axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/air')
          .then(function (response) {
            console.log(response.data)
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
