<template>
  <div id="container">
    <HomeNav />
    <h1 id="forum-title">Fil d'actualité</h1>
    <p v-if="postList.length >= 1">{{ postList.length }} publication<span v-if="postList.length >= 2">s</span></p>

    <p class="alert-msg">{{ updateMessage }}</p>

    <Post
      v-for="post in postList"
      v-bind:key="post.postID"
      :postID="post.postID"
      @post-deleted="getPostsList"
      />
  
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
      updateMessage: "",
    }
  },
  methods: {
    getPostsList() {
      let url = `http://localhost:3000/api/post`;
      let options = {
          method: "GET",
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
          }
      };
      fetch(url, options)
          .then(response => response.json())
          .then((data) => {
              if (data[0]) {
                this.postList = data;
              } 
              else {
                this.updateMessage = "Soyez le premier à publier !";
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
  @import '../style/style.css';
</style>