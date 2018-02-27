<template>
  <div>
    <transition name="reddit-slide" mode="out-in">
      <keep-alive>
        <component :is="currentView" :activate-view="activateView"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import RedditHot from "../components/RedditHot.vue"
import RedditPost from "../components/RedditPost.vue"

export default {
  name: "RedditSection",
  components: {
    RedditHot,
    RedditPost
  },
  data() {
    return {
      currentView: "reddit-hot"
    }
  },
  methods: {
    activateView(view) {
      this.currentView = view
    }
  }
}
</script>

<style scoped>
.reddit-slide-enter-active,
.reddit-slide-leave-active {
  transition: opacity 0.5s;
}
.reddit-slide-enter, .reddit-slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
