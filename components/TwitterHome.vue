<template>
  <div>
    <a @click="getListings(false)">get more</a>
    <ul id="example-1">
      <li v-for="(value, key, index) in listings" :key="index" class="item">
        <a :href="value.link" target="_blank" rel="noopener">{{ value.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import tweets from "../data/fakeTweets.json"

export default {
  ame: "TwitterHome",
  data() {
    return {
      listings: [],
      max_id: ""
    }
  },
  created() {
    this.getListings(true)
  },
  methods: {
    getListings() {
      let that = this
      that.listings = tweets.map(function(element) {
        let newItem = {}
        let username = element.user.screen_name
        let id = element.id_str
        newItem.title = element.text
        newItem.link = `https://twitter.com/${username}/status/${id}`
        return newItem
      })
      // axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/twitter', {
      //   params: {
      //     max_id: that.max_id
      //   }
      // })
      //   .then(function (response) {
      //     console.log(response.data)
      //     let index = response.data.length - 1
      //     that.max_id = response.data[index].id_str
      //     if (firstTime) {
      //       that.listings = response.data.map(function (element, index) {
      //         let newItem = {}
      //         let username = element.user.screen_name
      //         let id = element.id_str
      //         newItem.title = element.text
      //         newItem.link = `https://twitter.com/${username}/status/${id}`
      //         return newItem
      //       })
      //     } else {
      //       let newListings = response.data.map(function (element, index) {
      //         let newItem = {}
      //         let username = element.user.screen_name
      //         let id = element.id_str
      //         newItem.title = element.text
      //         newItem.link = `https://twitter.com/${username}/status/${id}`
      //         return newItem
      //       })
      //       let noDuplicateListings = newListings.slice(1)
      //       that.listings = that.listings.concat(noDuplicateListings)
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    }
  }
}
</script>

<style scoped>
.item {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
