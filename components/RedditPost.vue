<template>
  <section class='post'>
    <main>
      <div class='info'>
        <div class='info_flex'>
          <a class='txt' :href="'https://www.reddit.com/r/' + activePost.sub" target="_blank" rel='noopener'>
            r/{{activePost.sub}}
          </a>
          <a class='txt' :href="'https://www.reddit.com/user/' + activePost.author" target="_blank" rel='noopener'>
            {{activePost.author}}
          </a>
        </div>
        <a class='title' :href="activePost.link" target="_blank" rel='noopener'>
          {{activePost.title}}
        </a>
        <a class='image_container' :href="activePost.extLink" target="_blank" rel='noopener'>
          <img class='image' :src="activePost.preview" :alt="activePost.title">
        </a>
      </div>
      <div class='comments'>
        <ul v-if='comments'>
          <li v-for="(comment, index) in comments" :key="index">
            <p>
              {{comment.body}}
            </p>
            <p v-if="comment.replies[0]">
              {{comment.replies[0].body}}
            </p>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RedditPost',
    data () {
      return {
        comments: ''
      }
    },
    created () {
      let data = this.activePost
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        console.log('-nah-')
      } else {
        console.log('gettting comments')
        this.getComments()
      }
    },
    methods: {
      extractData (data) {
        return data.map((element, index) => {
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
      getComments () {
        let that = this
        let postID = this.activePost.id
        axios.get('https://ciqfzfdgt5.execute-api.us-east-1.amazonaws.com/dev/comments', {
          params: {
            commentID: postID
          }
        })
          .then(function (response) {
            console.log('comments data')
            console.log(response.data)
            that.comments = response.data.comments
            // that.comments = that.extractData(response.data.comments)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    props: {
      toggleRead: {
        type: Function,
        required: false
      },
      activePost: {
        type: Object,
        required: false
      }
    }
  }
</script>

<style scoped>
  .txt {
    font-size:14px;
    color:#0079d3;
    text-decoration: none;
  }
  .info_flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:10px;
  }
  .post {
    overflow:auto;
    position:fixed;
    padding:10px;
    opacity:1;
    top:66px;
    left:0;
    z-index:2;
    width:100%;
    height:100%;
    background-color:white;
  }
  .title {
    text-align: left;
    font-size: 18px;
    color:#a5a4a4;
    display: block;
    text-decoration: none;
    margin-bottom:10px;
  }
  .image {
    width:100%;
    height:auto;
  }
  .image_container {
    display:block;
    margin-bottom:10px;
  }
  .comments {
    background-color:rgba(211, 211, 211, 0.1);
    width:100%;
    height:1000px;
  }
</style>
