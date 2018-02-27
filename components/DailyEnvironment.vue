<template>
  <div>
    <air-quality/>
    <weather-panel/>
  </div>
</template>

<script>
import WeatherPanel from "../components/WeatherPanel.vue"
import AirQuality from "../components/AirQuality.vue"

export default {
  name: "Index",
  components: {
    WeatherPanel,
    AirQuality
  }
}
</script>

<style scoped>
</style>
