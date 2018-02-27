<template>
  <section class="container">
    <div>
      <header class="header">
        <h1 class="title">Begend</h1>
        <nav class="nav">
          <span @click="activateView('daily-environment')">daily Env</span>
          <span @click="activateView('reddit-hot')">reddit</span>
          <span @click="activateView('twitter-home')">twitter</span>
        </nav>
      </header>
      <main class="wrapper">
        <transition name="root-fade" mode="out-in">
          <keep-alive>
            <component :is="currentView"/>
          </keep-alive>
        </transition>
      </main>
    </div>
  </section>
</template>

<script>
import DailyEnvironment from "../components/DailyEnvironment.vue"
import RedditHot from "../components/RedditHot.vue"
import TwitterHome from "../components/TwitterHome.vue"

export default {
  name: "Index",
  components: {
    DailyEnvironment,
    RedditHot,
    TwitterHome
  },
  data() {
    return {
      currentView: "daily-environment"
    }
  },
  created() {
    this.getLocation()
  },
  methods: {
    activateView(view) {
      this.currentView = view
    },
    getLocation() {
      if (navigator.geolocation) {
        let that = this
        navigator.geolocation.getCurrentPosition(
          that.getLocationSuccess,
          that.getLocationError
        )
      }
    },
    getLocationSuccess(pos) {
      let coords = pos.coords
      this.$store.commit("setPos", coords)
    },
    getLocationError(err) {
      console.log(err)
    }
  }
}
</script>

<style>
@import "../assets/css/global.css";

.wrapper {
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  padding-top: 78px;
}
.header {
  background-color: aliceblue;
  padding: 10px 10px 16px 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.title {
  margin-bottom: 10px;
}
.container {
  min-height: 100vh;
  text-align: center;
  overflow-x: hidden;
  position: relative;
  /* padding-top:78px; */
}
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.root-fade-enter-active,
.root-fade-leave-active {
  transition: opacity 0.5s;
}
.root-fade-enter, .root-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
