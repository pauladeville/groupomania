<template>
  <div id="container">
    <HomeNav />
    <h1>Fil d'actualité</h1>
    <p class="alert-msg">{{ updateMessage }}</p>

    <input
      id="search"
      type="search"
      placeholder="Rechercher un utilisateur..."
      v-model="searchKey"
    />

    
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
      searchKey: ""
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
  @import '../style/style.css'
</style>