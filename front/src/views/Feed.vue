<template>
  <div id="container">
    <HomeNav />
    <h1 id="forum-title">Fil d'actualité</h1>
    <p v-if="postList.length >= 1">{{ postList.length }} publication<span v-if="postList.length >= 2">s</span></p>

    <p class="alert-msg">{{ updateMessage }}</p>

    <div v-if="mostRecent">
      <button @click="mostRecent = false" class="orderby-button">Afficher d'abord<br>les plus anciennes
        <img src="../assets/arrow.png" alt="Flèche de tri ascendante" class="flipped">
      </button>
      <Post
        v-for="post in descList"
        v-bind:key="post.postID"
        :postID="post.postID"
        @post-deleted="getPostsList"
      />
    </div>

     <div v-if="!mostRecent">
      <button @click="mostRecent = true" class="orderby-button">Afficher d'abord<br>les plus récentes
        <img src="../assets/arrow.png" alt="Flèche de tri descendante">
      </button>
      <Post
        v-for="post in ascList"
        v-bind:key="post.postID"
        :postID="post.postID"
        @post-deleted="getPostsList"
      />
    </div>
  
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
      mostRecent: true,
    }
  },
  computed: {
    ascList() {
      let mostAncient = this.postList.slice().sort( (a, b) => {
        return new Date(a.dateSend).getTime() - new Date(b.dateSend).getTime();
      });
      return mostAncient;
    },
    descList() {
      let mostRecent = this.postList.slice().sort( (a, b) => {
        return new Date(b.dateSend).getTime() - new Date(a.dateSend).getTime();
      });
      return mostRecent;
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