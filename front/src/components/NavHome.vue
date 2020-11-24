<template>
    <header>
        <nav>
            <ul>
                <li>
                <router-link to="/">
                    <img src="assets/img/logo-groupomania.png" id="logo" alt="Logo de Groupomania" />
                </router-link>
                </li>
                <li class="nav-links">
                <router-link to="/publier">
                    <i class="fas fa-pen"></i>
                </router-link>
                <router-link to="/profil">
                    <i class="fas fa-user"></i>
                </router-link>
                <i class="fas fa-sign-out-alt" id="signout"></i>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "NavHome"
    }
</script>
