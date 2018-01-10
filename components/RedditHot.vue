<template>
    <div>
      <a @click='getListings(false)'>get more</a>
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
        listings: [],
        anchor: ''
      }
    },
    methods: {
      getListings (firstTime) {
        let that = this
        axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/reddit', {
          params: {
            after: that.anchor
          }
        })
          .then(function (response) {
            let index = response.data.length - 1
            that.anchor = response.data[index].name
            if (firstTime) {
              that.listings = response.data.map(function (element, index) {
                let newItem = {}
                newItem.title = element.title
                newItem.link = `https://www.reddit.com/${element.permalink}`
                return newItem
              })
            } else {
              let newListings = response.data.map(function (element, index) {
                let newItem = {}
                newItem.title = element.title
                newItem.link = `https://www.reddit.com/${element.permalink}`
                return newItem
              })
              that.listings = that.listings.concat(newListings)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created () {
      // first time -- true
      this.getListings(true)
    }
  }
</script>

<style scoped>

</style>
