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
                    v-model="userInfo.firstName"
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
                    v-model="userInfo.lastName"
                    >
            </fieldset>
            <fieldset>
                <label for="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    required
                    placeholder="Entrez une adresse email valide"
                    name="email"
                    maxlength="60"
                    aria-label="Entrez votre adresse email"
                    v-model="userInfo.email"
                >
            </fieldset>
            <fieldset>
                <label for="password">Mot de passe *</label>
                <input
                    type="password"
                    id="password"
                    required
                    placeholder="Renseignez votre mot de passe"
                    name="password"
                    aria-label="Choisissez un mot de passe comprenant 1 minuscule, 1 majuscule et 1 chiffre"
                    aria-describedby="passwordInfo"
                    v-model="userInfo.password"
                >
            </fieldset>
            <p class="alert-msg">{{ errorMessage }} </p>
            <button>Créez votre compte</button>
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
            userInfo: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            errorMessage: ""
        }
    },
    methods: {
        signup() {
            if(this.userInfo.firstName && this.userInfo.lastName && this.userInfo.email && this.userInfo.password) {
            //construction de l'objet "profil" à envoyer à l'API
            let userProfile = {
                "firstName": this.userInfo.firstName,
                "lastName": this.userInfo.lastName,
                "email": this.userInfo.email,
                "password": this.userInfo.password
            }
            // console.log(userProfile)
            let url = "http://localhost:3000/api/user/signup"
            let options = {
                method: "POST",
                body: JSON.stringify(userProfile),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
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