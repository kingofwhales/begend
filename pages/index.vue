<template>
  <section class="container">
    <div>
      <h1>Begend</h1>
      <div>
        <span @click="currentView='daily-environment'">daily Env</span>
        <span @click="currentView='reddit-hot'">reddit</span>
        <span @click="currentView='twitter-home'">twitter</span>
      </div>
      <transition name="root-fade" mode='out-in'>
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import DailyEnvironment from '../components/DailyEnvironment.vue'
import RedditHot from '../components/RedditHot.vue'
import TwitterHome from '../components/TwitterHome.vue'

export default {
  name: 'index',
  data () {
    return {
      currentView: 'daily-environment'
    }
  },
  components: {
    DailyEnvironment,
    RedditHot,
    TwitterHome
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
.root-fade-enter-active, .root-fade-leave-active {
  transition: opacity .5s;
}
.root-fade-enter, .root-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
