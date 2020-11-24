<template>

  <header>

    <h1>
      <img src="assets/img/logo-groupomania.png" id="logo" alt="Logo de Groupomania" />
    </h1>
    
    <nav>
      <router-link to="/">Se connecter</router-link> |
      <router-link to="/Signup">S'inscrire</router-link>
    </nav>

  </header>
</template>

<script>
export default {
  name: "WelcomeNav",
};
</script>

<style scoped lang="scss">
  header {
    margin: 50px;
	  border-bottom: 3px solid #fff;
  }
</style>