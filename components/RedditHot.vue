<template>
  <div class="homepage">
    <div :class="{reading: read}" class="home">
      <ul id="example-1">
        <li v-for="(item, index) in listings" :key="index">
          <div class="item">
            <img :src="item.thumbnail" alt="list image" class="thumbnail" @click="togglePreview(index)">
            <div class="info">
              <a class="title" target="_blank" rel="noopener" @click="toggleRead(item)">{{ item.title }}</a>
              <p class="comments">
                {{ item.num_comments }}
              </p>
            </div>
          </div>
          <img v-if="ifPreviewOn(index)" :src="item.preview" class="preview" alt="image preview">
        </li>
      </ul>
    </div>
    <button :class="{reading: read}" class="back" @click="toggleRead('back')">
      Back
    </button>
    <transition
      name="post-slide"
      @before-enter="beforeSlideEnter"
      @before-leave="beforeSlideLeave"
    >
      <reddit-post v-if="read" :toggle-read="toggleRead" :active-post="activePost"/>
    </transition>
  </div>
</template>

<script>
import axios from "axios"

import pig from "../assets/image/pig.jpg"
import pigPreview from "../assets/image/pig_preview.jpg"

import RedditPost from "./RedditPost.vue"

export default {
  name: "RedditHot",
  components: {
    RedditPost
  },
  data() {
    return {
      listings: [],
      anchor: "",
      previewShown: [],
      read: false,
      scrollTop: 0,
      activePost: {}
    }
  },
  created() {
    // first time -- true
    this.getListings(true)
  },
  methods: {
    beforeSlideEnter() {
      // console.log('--before slide scroll pos---')
      // console.log(scrollTop)
    },
    beforeSlideLeave() {
      console.log("---just scrolled---")
      // window.scrollTo(0, 500)
    },
    toggleRead(activeItem) {
      this.read = !this.read
      if (activeItem !== "back") {
        this.activePost = activeItem
      }
    },
    togglePreview(index) {
      let location = this.previewShown.indexOf(index)
      if (location > -1) {
        this.previewShown.splice(location, 1)
      } else {
        this.previewShown.push(index)
      }
    },
    ifPreviewOn(index) {
      return this.previewShown.indexOf(index) > -1
    },
    getListings(firstTime) {
      let that = this
      axios
        .get(
          "https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/reddit",
          {
            params: {
              after: that.anchor
            }
          }
        )
        .then(function(response) {
          console.log("---raw data---")
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
        .catch(function(error) {
          console.log(error)
        })
    },
    extractData(data) {
      return data.map(function(element) {
        let newItem = {}
        newItem.title = element.title
        newItem.id = element.id
        newItem.sub = element.subreddit
        newItem.author = element.author
        newItem.extLink = element.url
        newItem.link = `https://www.reddit.com/${element.permalink}`
        if (element.thumbnail.indexOf("http") > -1) {
          newItem.thumbnail = element.thumbnail
        } else {
          newItem.thumbnail = pig
        }
        newItem.num_comments = element.num_comments
        if (element.preview) {
          newItem.preview = element.preview.images[0].source.url
        } else {
          newItem.preview = pigPreview
        }
        return newItem
      })
    }
  }
}
</script>

<style scoped>
.homepage {
  /* position: relative; */
}
.item {
  padding-top: 10px;
  padding-bottom: 10px;
}
.thumbnail {
  width: 60px;
  height: auto;
  flex-shrink: 0;
}
.title {
  text-decoration: none;
  color: rgb(34, 34, 34);
  text-align: left;
  display: block;
  padding-left: 10px;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid lightblue;
  border-width: 0px 0px 1px 0px;
}
.test {
  background-color: red;
  opacity: 0.4;
  width: 100%;
  left: 0px;
  height: 100%;
  position: fixed;
  top: 66px;
  overflow: auto;
}
.comments {
  text-align: right;
  background-image: url(../assets/image/chat.svg);
  background-repeat: no-repeat;
  background-position: 100% 1px;
  padding-right: 24px;
  color: lightgrey;
}
.info {
  flex-grow: 1;
}
.preview {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.post-slide-enter-active,
.post-slide-leave-active {
  transition: transform 1s;
}
.post-slide-enter, .post-slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
.home {
  filter: grayscale(0%);
  transition: transform 0.3s linear, filter 0.3s linear;
}
.home.reading {
  filter: grayscale(40%);
  transform: scale(0.99);
}
.back {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #ed3332;
  width: 60px;
  height: 60px;
}

.back {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: red;
  width: 40px;
  height: 40px;
  opacity: 0;
  z-index: 3;
  border-radius: 50%;
  transition: opacity 1s linear;
}

.back.reading {
  opacity: 1;
}
</style>
