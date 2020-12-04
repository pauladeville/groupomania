<template>
  <div id="container">
    <HomeNav />
    <h1>Fil d'actualité</h1>
    <p class="alert-msg">{{ updateMessage }}</p>
    <Post v-for="post in postList" v-bind:key="post.postID" :postID="post.postID" />
  </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
import Post from '../components/Post'

export default {
  name: 'Feed',
  components: {
    HomeNav,
    Post
  },
  data() {
    return {
      postList: [],
      updateMessage: ""
    }
  },
  methods: {
    getPostsList() {
      let url = `http://localhost:3000/api/post`;
      let options = {
          method: "GET",
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              'Content-Type': 'application/json'
          }
      };
      fetch(url, options)
          .then(response => response.json())
          .then((data) => {
              if (data[0]) {
                this.postList = data;
              } else {
                this.updateMessage = data.message;
              }
          })
          .catch(error => console.log(error))
    }
  },
  mounted() {
    this.getPostsList();
  }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>