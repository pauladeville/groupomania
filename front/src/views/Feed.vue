<template>
  <div id="container">
    <HomeNav />
    <h1>Fil d'actualité</h1>
    <Post />
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
  }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>