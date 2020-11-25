<template>
  <header>
    <h1>
      <img src="../assets/logo-groupomania.png" id="logo" alt="Logo de Groupomania" />
    </h1>
    <nav>
      <router-link to="/">Se connecter</router-link> |
      <router-link to="/inscription">S'inscrire</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "WelcomeNav",
};
</script>

<style lang="scss" scoped>
  @import '../style.scss'
</style>