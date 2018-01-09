<template>
    <div>
      <ul id="example-1">
        <li v-for="(value, key, index) in listings" :key="index">
          <a :href="value.link" target='_blank' rel='noopener'>{{value.title}}</a>
        </li>
      </ul>
    </div>
</template>

<script>
  // import axios from 'axios'
  import tweets from '../data/fakeTweets.json'

  export default {
    ame: 'TwitterHome',
    data () {
      return {
        listings: []
      }
    },
    created () {
      let that = this
      that.listings = tweets.map(function (element, index) {
        let newItem = {}
        let username = element.user.screen_name
        let id = element.id_str
        newItem.title = element.text
        newItem.link = `https://twitter.com/${username}/status/${id}`
        return newItem
      })
      // axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/twitter')
      //   .then(function (response) {
      //     console.log(response.data)
      //     that.listings = response.data.map(function (element, index) {
      //       let newItem = {}
      //       let username = element.user.screen_name
      //       let id = element.id_str
      //       newItem.title = element.text
      //       newItem.link = `https://twitter.com/${username}/status/${id}`
      //       return newItem
      //     })
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    }
  }
</script>

<style scoped>

</style>
