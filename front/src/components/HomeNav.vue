<template>
    <header>
        <nav>
            <router-link to="/forum">
                <img src="../assets/logo-groupomania.png" id="logo" alt="Logo de Groupomania" />
            </router-link>
            <ul>
                <li class="nav-links">
                <router-link to="/publier">
                    <img class="nav-icon" src="../assets/send.png">
                </router-link>
                <router-link to="/profil">
                    <img class="nav-icon" src="../assets/user.png">
                </router-link>
                    <img @click="logout" class="nav-icon" src="../assets/logout.png">
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "HomeNav",
        methods: {
            logout() {
                this.$router.push("/");
            }
        }
    }
</script>

<style lang="css">
  @import '../style/style.css'
</style>