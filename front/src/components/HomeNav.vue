<template>
    <header>
        <nav>
            <ul>
                <li>
                <router-link to="/">
                    <img src="../assets/logo-groupomania.png" id="logo" alt="Logo de Groupomania" />
                </router-link>
                </li>
                <li class="nav-links">
                <router-link to="/publier">
                    <img src="../assets/send.png">
                </router-link>
                <router-link to="/profil">
                    <img src="../assets/user.png">
                </router-link>
                <i class="fas fa-sign-out-alt" id="signout"></i>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "HomeNav"
    }
</script>

<style lang="scss" scoped>
  @import '../style.scss'
</style>