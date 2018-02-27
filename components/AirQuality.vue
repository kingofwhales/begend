<template>
  <div>
    <div v-if="pm25">
      <p class="text">pm2.5: {{ pm25 }}</p>
    </div>
    <div v-else>loading.....</div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "AirQuality",
  data() {
    return {
      pm25: 0
    }
  },
  computed: {
    posLat() {
      return this.$store.state.pos.lat
    }
  },
  watch: {
    posLat: function() {
      console.log("changed")
      let that = this
      axios
        .get("https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/air")
        .then(function(response) {
          console.log(response.data)
          that.extractData(response.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  methods: {
    extractData(data) {
      this.pm25 = data.data.aqi
    }
  }
}
</script>

<style scoped>
.text {
  color: black;
  text-align: left;
}
</style>
