<template>
    <div>
      <ul id="example-1">
        <li v-for="(value, key, index) in listings" :key="index">
          <a target='_blank' rel='noopener' :href="value.link">{{value.title}}</a>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RedditHot',
    data () {
      return {
        listings: []
      }
    },
    created () {
      let that = this
      axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/reddit')
        .then(function (response) {
          that.listings = response.data.map(function (element, index) {
            let newItem = {}
            newItem.title = element.title
            newItem.link = `https://www.reddit.com/${element.permalink}`
            return newItem
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
</script>

<style scoped>

</style>
