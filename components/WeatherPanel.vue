<template>
  <div>
    <div v-if='temp'>
      <p>temperature: {{temp}}</p>
      <p>summary: {{summary}}</p>
      <ul>
        Hourly:
        <li v-for="hour in hours">
          {{ hour.temp }} at {{hour.time}}
        </li>
      </ul>
      <ul>
        Daily:
        <li v-for="day in days">
          {{ day.temp }} at {{day.time}} with {{day.summary}}
        </li>
      </ul>

    </div>
    <div v-else>loading.....</div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'WeatherPanel',
    data () {
      return {
        temp: 0,
        summary: 'n/a',
        hourly: 0,
        daily: 0,
        city: 'n/a'
      }
    },
    methods: {
      extractData (data) {
        this.temp = data.currently.temperature
        this.summary = data.currently.summary
        this.hourly = data.hourly.data.slice(1, 25)
        this.daily = data.daily.data
        this.city = data.timezone
      }
    },
    computed: {
      posLat () {
        return this.$store.state.pos.lat
      },
      hours () {
        return this.hourly.map((hour) => {
          let newHour = {}
          let time = new Date(hour.time * 1000)
          let clock = time.getHours()
          newHour.time = clock
          newHour.temp = hour.temperature
          return newHour
        })
      },
      days () {
        return this.daily.map((day) => {
          let newDays = {}
          let time = new Date(day.time * 1000)
          let calendar = time.getDate()
          newDays.time = calendar
          newDays.temp = (day.temperatureHigh + day.temperatureLow) / 2
          newDays.summary = day.summary
          return newDays
        })
      }
    },
    watch: {
      posLat: function (newPos, oldPos) {
        console.log('changed')
        let that = this
        axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/weather')
          .then(function (response) {
            console.log(response.data)
            that.extractData(response.data)
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
