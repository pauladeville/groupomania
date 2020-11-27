<template>
    <div id="container">
        <HomeNav />
        <h1>Modifier mon profil</h1>
        <form>
            <fieldset>
                <label for="newFirstname">Votre prénom n'est pas {{ userProfile.firstName }} ?</label>
                <input id="newFirstName" placeholder="Votre vrai prénom" name="new-first_name">
            </fieldset>
            <fieldset>
                <label for="newLastName">Votre nom n'est pas {{ userProfile.lastName }} ?</label>
                <input id="newLastName" class="focus" placeholder="Votre vrai nom" name="new-ast_name">
            </fieldset>

            <!-- <fieldset>
                <label for="new-email">Nouvel email</label>
                <input id="new-email" placeholder="Email" type="email" name="new-email" required>
            </fieldset>
            <fieldset>
                <label for="new-password">Nouveau mot de passe</label>
                <input id="new-password" placeholder="Email" type="email" name="new-password" required>
            </fieldset> -->
            <p class="alert-msg">{{ updateMessage }}</p>
            <button v-on:click="modifyProfile" id="modify-user">Modifier mon profil</button>
            <button v-on:click="deleteProfile" id="delete-user">Supprimer mon compte</button>
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
            updateMessage: "",
            userProfile: {
                userID: "",
                firstName: "",
                lastName: ""
            },
        }
    },
    methods: {
        setProfile() {
            this.userProfile.userID = localStorage.getItem("userID");
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }`;
            let options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.userProfile.firstName = data[0].firstName;
                    this.userProfile.lastName = data[0].lastName;
                })
                .catch(error => console.log(error))
        },
        modifyProfile() {
            let profileToSend = {
                newFirstName: document.getElementById("newFirstName").value,
                newLastName: document.getElementById("newLastName").value,
            };
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }`;
            let options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileToSend)
            };
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if(res >= 200 && res <= 299){
                        this.$router.push("profil");
                    }
                })
                .catch(error => console.log(error))
        },
        deleteProfile() {
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }`;
            let options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, options)
                .then(res => res.json())
                .then(this.$router.push("/"))
                .catch(error => console.log(error))
        }
    },
    mounted() {
        this.setProfile();
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>