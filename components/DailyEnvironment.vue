<template>
  <div class='wrapper'>
      <air-quality></air-quality>
      <weather-panel></weather-panel>
  </div>
</template>

<script>
  import WeatherPanel from '../components/WeatherPanel.vue'
  import AirQuality from '../components/AirQuality.vue'

  export default {
    name: 'index',
    components: {
      WeatherPanel,
      AirQuality
    }
  }
</script>

<style scoped>
  .wrapper {
    padding:10px 10px;
  }
</style>
