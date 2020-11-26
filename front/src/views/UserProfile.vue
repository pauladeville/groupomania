<template>
    <div id="container">
        <HomeNav />
        <h1>Mon profil</h1>
        <form name="profil">
            <fieldset>
                <label for="new-lastName">Votre nom n'est pas {{ lastName }} ?</label>
                <input id="new-lastName" class="focus" placeholder="Votre vrai nom" name="new-ast_name" required>
            </fieldset>
            <fieldset>
                <label for="new-firstname">Votre prénom n'est pas {{ firstName }} ?</label>
                <input id="new-firstName" placeholder="Votre vrai prénom" name="new-first_name" required>
            </fieldset>
            <!-- <fieldset>
                <label for="new-email">Nouvel email</label>
                <input id="new-email" placeholder="Email" type="email" name="new-email" required>
            </fieldset>
            <fieldset>
                <label for="new-password">Nouveau mot de passe</label>
                <input id="new-password" placeholder="Email" type="email" name="new-password" required>
            </fieldset> -->
            <button type="submit" id="modification" class="focus">Modifier mon profil</button>
            <button id="delete-user" class="focus">Supprimer mon compte</button>
        </form>
    </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
export default {
    name: 'UserProfile',
    components: {
        HomeNav
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        getUser() {
            let url = `http://localhost:3000/api/user/${this.$route.params.id}`
            let options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
    },
    mounted() {
        this.getUser();
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>