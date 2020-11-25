<template>
  <div id="container">
    <HomeNav />
    <h1>Fil d'actualité</h1>
  </div>
</template>

<script>
import HomeNav from '@/components/HomeNav.vue'

export default {
  name: 'Feed',
  components: {
    HomeNav
  }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>