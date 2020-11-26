<template>
    <div id="container">
        <HomeNav />
        <h1>Mon profil</h1>
        <form v-on:submit.prevent="modifyProfile">
            <fieldset>
                <label for="newFirstname">Votre prénom n'est pas {{ userProfile.firstName }} ?</label>
                <input id="newFirstName" placeholder="Votre vrai prénom" name="new-first_name" required>
            </fieldset>
            <fieldset>
                <label for="newLastName">Votre nom n'est pas {{ userProfile.lastName }} ?</label>
                <input id="newLastName" class="focus" placeholder="Votre vrai nom" name="new-ast_name" required>
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
            userProfile: {},
        }
    },
    methods: {
        setProfile() {
            let storedProfile = JSON.parse(localStorage.getItem("userProfile"))
            console.log(storedProfile)
            this.userProfile = storedProfile
        },
        modifyProfile() {
            let profileToSend = {
                userID: this.userProfile.userID,
                newFirstName: document.getElementById("newFirstName").value,
                newLastName: document.getElementById("newLastName").value,
            }
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }/modify`
            let options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileToSend)
            }
            fetch(url, options)
                .then(response => response.json())
                .then(data => console.log(data))
                .then(            this.setProfile()
)
                .catch(error => console.log(error))
        }
        // getUser() {
        //     let url = `http://localhost:3000/api/user/${ this.userID }/profile`
        //     let options = {
        //         method: "GET",
        //         // headers: {
        //         //     'Content-Type': 'application/json'
        //         // }
        //     }
        //     fetch(url, options)
        //         .then(response => response.json())
        //         .then(data => console.log(data))
        //         .catch(error => console.log(error))
        // }
    },
    mounted() {
        this.setProfile();
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>