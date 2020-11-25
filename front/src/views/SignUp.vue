<template>
    <div id="container">

        <WelcomeNav />

        <h1>Nouveau sur Groupomania ?</h1>
        <form v-on:submit.prevent="signup">
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
            <!-- <fieldset>
                <label for="email">Email *</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder="Entrez une adresse email valide"
                    name="email"
                    maxlength="60"
                    aria-label="Entrez votre email"
                    v-model="email"
                >
            </fieldset>
            <fieldset>
                <label for="password">Mot de passe *</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder="Renseignez votre mot de passe"
                    name="password"
                    aria-label="Entrez votre mot de passe"
                    aria-describedby="passwordInfo"
                    v-model="password"
                >
            </fieldset> -->
            <p>{{ errorMessage }} </p>
            <button>S'inscrire</button>
        </form>
    </div>
</template>

<script>
import WelcomeNav from '../components/WelcomeNav.vue'
export default {
    name: 'SignUp',
    components: { WelcomeNav },
    data: () => {
        return {
            firstName: "",
            lastName: "",
            // email: "",
            // password: "",
            errorMessage: ""
        }
    },
    methods: {
        signup() {
            if(this.firstName && this.lastName) {
                let userProfile = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                let url = "http://localhost:3000/api/user/signup"
                let options = {
                    method: "POST",
                    body: JSON.stringify(userProfile),
                }
                fetch(url, options)
                .then(console.log("félicitation grande folle"))
                .catch(error => console.log(error))
            }
            // this.$router.push("forum");
        }
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>