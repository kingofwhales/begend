<template>
  <section class="container">
    <div>
      <h1>Begend</h1>
      <weather-panel></weather-panel>
      <air-quality></air-quality>
    </div>
  </section>
</template>

<script>
import WeatherPanel from '../components/WeatherPanel.vue'
import AirQuality from '../components/AirQuality.vue'

export default {
  name: 'index',
  components: {
    WeatherPanel,
    AirQuality
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        let that = this
        navigator.geolocation.getCurrentPosition(
          that.getLocationSuccess,
          that.getLocationError)
      }
    },
    getLocationSuccess (pos) {
      let coords = pos.coords
      this.$store.commit('setPos', coords)
    },
    getLocationError (err) {
      console.log(err)
    }
  },
  created () {
    this.getLocation()
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  text-align: center;
  padding-top:20px;
}
</style>
