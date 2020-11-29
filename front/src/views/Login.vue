<template>
    <div id="container">

        <WelcomeNav />

        <h1>Accédez à votre espace personnel</h1>
        <form v-on:submit.prevent="login">
            <fieldset>
                <label for="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    required
                    placeholder="Entrez une adresse email valide"
                    name="email"
                    maxlength="60"
                    aria-label="Entrez votre email"
                    v-model="email" />
            </fieldset>
            <fieldset>
                <label for="password">Mot de passe *</label>
                <input
                    type="password"
                    id="password"
                    required
                    placeholder="Renseignez votre mot de passe"
                    name="password"
                    aria-label="Entrez votre mot de passe"
                    aria-describedby="passwordInfo"
                    v-model="password" />
            </fieldset>
            <p class="alert-msg">{{ errorMessage }}</p>
            <button>Se Connecter</button>
        </form>
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
            if (this.email && this.password) {
                //construction de l'objet "identifiants" à envoyer à l'API
                let loginUsed = {
                    "email": this.email,
                    "password": this.password
                }
                console.log(loginUsed)
                let url = "http://localhost:3000/api/user/login"
                let options = {
                    method: "POST",
                    body: JSON.stringify(loginUsed),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        //si l'API valide les données et renvoie un token
                        if (res.userID && res.token) {
                            localStorage.setItem("userID", res.userID)
                            localStorage.setItem("token", res.token)
                            console.log(localStorage)
                            this.$router.push("forum");
                        } else {
                            //sinon afficher le message d'erreur correspondant sous le formulaire
                            this.errorMessage = res.message
                        }
                    })
                    .catch(error => console.log(error))
            }
        }
    },
    mounted() {
        localStorage.clear();
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>