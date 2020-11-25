<template>
    <div id="container">

        <WelcomeNav />

        <h1>Accédez à votre espace personnel</h1>
        <form v-on:submit.prevent="login">
            <fieldset>
                <label for="firstname">Prénom *</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    pattern="^\D*$"
                    placeholder="Renseignez ici votre prénom"
                    maxlength="30"
                    aria-label="Entrez votre prénom"
                    v-model="firstName"
                >
            </fieldset>
            <fieldset>
                <label for="lastname">Nom *</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    required
                    pattern="^\D*$"
                    placeholder="Renseignez ici votre nom de famille"
                    maxlength="30"
                    aria-label="Entrez votre nom"
                    v-model="lastName"
                    >
            </fieldset>

            <!-- <fieldset> -->
                <!-- <label for="email">Email *</label> -->
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
            <!-- </fieldset> -->
            <!-- <fieldset> -->
                <!-- <label for="password">Mot de passe *</label> -->
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
            <!-- </fieldset> -->
            <button>Se Connecter</button>
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
            firstName: "",
            lastName: "",
            errorMessage: ""
        }
    },
    methods: {
        login() {
            if (this.firstName && this.lastName) {
                const loginUsed = {
                    "firstName": this.firstName,
                    "lastName": this.lastName
                }
                let url = "http://localhost:3000/api/user/login"
                let options = {
                    method: "POST",
                    body: JSON.stringify(loginUsed),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                    .then(this.$router.push("forum"))
                    .catch(error => console.log(error))
            }
        }
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>