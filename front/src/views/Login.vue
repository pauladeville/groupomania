<template>
    <div id="container">

        <WelcomeNav />

        <h1>Connectez-vous :</h1>
        <form method="post" name="connexion">
            <fieldset>
                <label for="email">Email *</label>
                <!-- <input
                    type="email"
                    class="form-control"
                    id="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                    placeholder="Entrez une adresse email valide"
                    name="email"
                    maxlength="60"
                    aria-label="Entrez votre email"
                    v-model="email"
                    v-on:input="sendData"
                > -->
            </fieldset>
            <fieldset>
                <label for="password">Mot de passe *</label>
                <!-- <input
                    type="password"
                    class="form-control"
                    id="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                    placeholder="Renseignez votre mot de passe"
                    name="password"
                    aria-label="Entrez votre mot de passe"
                    aria-describedby="passwordInfo"
                    v-model="password"
                    v-on:input="sendData"
                > -->
            </fieldset>
            <button type="submit" v-on:click="login">Se Connecter</button>
        </form>
        <p>{{ errorMessage }}</p>
    </div>
</template>

<script>
import WelcomeNav from '../components/WelcomeNav.vue'
export default {
    components: { WelcomeNav },
    name: 'Login',
    data: () => {
        return {
            email: "",
            password: "",
            errorMessage: ""
        }
    },
    methods: {
        login() {
            // const emailValid = document.getElementById("email").checkValidity();
            // const passwordValid = document.getElementById("password").checkValidity();
            // if (emailValid && passwordValid) {
                this.$router.push("forum");
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../style.scss'
</style>