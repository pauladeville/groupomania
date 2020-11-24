<template>
  <div id="container">
    <NavHome />
    <h1>Fil d\'actualité</h1>
  </div>
</template>

<script>
import NavHome from '@/components/NavHome.vue'

export default {
  name: 'Feed',
  components: {
    NavHome
  }
}
</script>