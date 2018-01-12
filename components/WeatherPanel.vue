<template>
  <div>
    <div v-if='temp'>
      <p class='text'>temperature: {{temp}}</p>
      <p class='text'>summary: {{summary}}</p>
      <p class='title'>hourly: </p>
      <div class='scroller'>
        <div class='item' v-for="(item, index) in hours" :key='index'>
          {{ item.temp }} <br> at {{item.time}} <br> {{item.summary}}
        </div>
      </div>
      <p class='title'>daily:</p>
      <div class='scroller'>
        <div class='item' v-for="(item, index) in days" :key='index'>
          {{ item.temp }} <br> at {{item.time}} <br> {{item.summary}}
        </div>
      </div>

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
        hourlySummary: 'n/a',
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
          newHour.summary = hour.summary
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
    text-align:left;
  }
  .scroller {
    width:100%;
    overflow-x:scroll;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .item {
    flex-basis:42%;
    margin-right:20px;
    flex-grow:0;
    flex-shrink:0;
  }
  .title {
    margin-top:20px;
  }
</style>
