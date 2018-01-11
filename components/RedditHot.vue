<template>
    <div>
      <a @click='getListings(false)'>get more</a>
      <ul id="example-1">
        <li class='item' v-for="(value, key, index) in listings" :key="index">
          <img :src="value.thumbnail" alt="list image" class='thumbnail'>
          <div class='info'>
            <a class='title' target='_blank' rel='noopener' :href="value.link">{{value.title}}</a>
            <p class='comments'>
              {{value.num_comments}}
            </p>
          </div>

        </li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'
  import pig from '../assets/image/pig.jpg'

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
            console.log(response.data)
            let index = response.data.length - 1
            that.anchor = response.data[index].name
            if (firstTime) {
              that.listings = that.extractData(response.data)
            } else {
              let newListings = that.extractData(response.data)
              that.listings = that.listings.concat(newListings)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      extractData (data) {
        return data.map(function (element, index) {
          let newItem = {}
          newItem.title = element.title
          newItem.link = `https://www.reddit.com/${element.permalink}`
          if (element.thumbnail.indexOf('http') > -1) {
            newItem.thumbnail = element.thumbnail
          } else {
            newItem.thumbnail = pig
          }
          newItem.num_comments = element.num_comments
          newItem.preview = element.preview || undefined
          return newItem
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
  .item {
    padding-top:10px;
    padding-bottom:10px;
  }
  .thumbnail {
    width:60px;
    height:60px;
    flex-shrink:0;
  }
  .title {
    text-decoration:none;
    color:rgb(34, 34, 34);
    text-align:left;
    display:block;
    padding-left:10px;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items:flex-start;
    border:1px solid lightblue;
    border-width:0px 0px 1px 0px;
  }
  .comments {
    text-align: right;
    background-image:url(../assets/image/chat.svg);
    background-repeat: no-repeat;
    background-position:100% 1px;
    padding-right:24px;
    color:lightgrey;
  }
  .info {
    flex-grow:1;
  }
</style>
