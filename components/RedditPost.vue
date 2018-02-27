<template>
  <section class="post">
    <main>
      <div class="info">
        <div class="info_flex">
          <a :href="'https://www.reddit.com/r/' + activePost.sub" class="txt" target="_blank" rel="noopener">
            r/{{ activePost.sub }}
          </a>
          <a :href="'https://www.reddit.com/user/' + activePost.author" class="txt" target="_blank" rel="noopener">
            {{ activePost.author }}
          </a>
        </div>
        <a :href="activePost.link" class="title" target="_blank" rel="noopener">
          {{ activePost.title }}
        </a>
        <a :href="activePost.extLink" class="image_container" target="_blank" rel="noopener">
          <img :src="activePost.preview" :alt="activePost.title" class="image">
        </a>
      </div>
      <div class="comments">
        <ul v-if="comments">
          <li v-for="(comment, index) in comments" :key="index" class="comment">
            <div class="secondary_info">
              <a :href="'https://www.reddit.com/user/' + comment.author" target="_blank" rel="noopener" class="comment_main_username">
                u/{{ comment.author }}
              </a>
              <a :href="activePost.link" class="score" target="_blank" rel="noopener">
                <img class="upvote" src="../assets/image/banana.svg" alt="give you one banana for upvotes!">
                {{ comment.score }}
              </a>
            </div>
            <p class="comment_main">
              {{ comment.body }}
            </p>
            <div v-if="comment.replies[0]" class="comment_reply">
              <div class="secondary_info">
                <a :href="'https://www.reddit.com/user/' + comment.replies[0].author" class="comment_main_username" target="_blank" rel="noopener">
                  u/{{ comment.replies[0].author }}
                </a>
                <a :href="activePost.link" class="score" target="_blank" rel="noopener">
                  <img class="upvote" src="../assets/image/banana.svg" alt="give you one banana for upvotes!">
                  {{ comment.replies[0].score }}
                </a>
              </div>
              <p class="main_info">
                {{ comment.replies[0].body }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
import axios from "axios"

export default {
  name: "RedditPost",
  props: {
    toggleRead: {
      type: Function,
      default: null,
      required: false
    },
    activePost: {
      type: Object,
      default: null,
      required: false
    }
  },
  data() {
    return {
      comments: ""
    }
  },
  created() {
    let data = this.activePost
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      console.log("-nah-")
    } else {
      console.log("gettting comments")
      this.getComments()
    }
  },
  methods: {
    extractData(data) {
      return data.map(element => {
        let newItem = {}
        newItem.commentText = element.body
        if (element.replies.length !== 0) {
          // console.log('-current index-')
          // console.log(index)
          // console.log(element.replies)
          // console.log(element.replies[0].body)
          newItem.reply = element.replies[0].body
        }
        return newItem
      })
    },
    getComments() {
      let that = this
      let postID = this.activePost.id
      axios
        .get(
          "https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/comments",
          {
            params: {
              commentID: postID
            }
          }
        )
        .then(function(response) {
          console.log("comments data")
          console.log(response.data)
          that.comments = response.data.comments.sort((a, b) => {
            if (a.score > b.score) {
              return -1
            } else if (a.score < b.score) {
              return 1
            } else {
              return 0
            }
          })
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.txt {
  font-size: 13px;
  color: #0079d3;
  text-decoration: none;
}
.info_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.post {
  overflow: auto;
  position: fixed;
  padding: 10px;
  opacity: 1;
  top: 66px;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: white;
}
.title {
  text-align: left;
  font-size: 16px;
  color: #a5a4a4;
  display: block;
  text-decoration: none;
  margin-bottom: 10px;
}
.image {
  width: 100%;
  height: auto;
}
.image_container {
  display: block;
  margin-bottom: 10px;
}
.comments {
  background-color: rgba(211, 211, 211, 0.1);
  width: 100%;
  height: auto;
}
.comment {
  border: 1px solid grey;
  border-width: 0px 0px 0px 0px;
  margin-bottom: 20px;
}
.comment_main,
.comment_reply {
  text-align: left;
  font-size: 13px;
}
.comment_main {
  margin-bottom: 0.6em;
}
.comment_reply {
  padding-left: 2em;
}
.secondary_info {
  display: flex;
  justify-content: space-between;
}
.comment_main_username,
.score {
  color: #aaa;
  text-decoration: none;
  font-size: 13px;
}
.upvote {
  width: 14px;
  height: 14px;
}
</style>
