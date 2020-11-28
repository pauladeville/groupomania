<template>
    <div id="container">
        <HomeNav />
        <h1>Modifier mon profil</h1>
        <form>
            <fieldset>
                <img class="avatar" :src="userProfile.avatarUrl">
                <label for="newAvatarUrl">Changer de photo de profil</label>
                <input v-on:change="updateAvatar" id="newAvatarUrl" type="file" accept="image/*">
            </fieldset>
            <fieldset>
                <label for="newFirstname">Votre prénom n'est pas <span class="bold-text">{{ userProfile.firstName }}</span> ?</label>
                <input id="newFirstName" placeholder="Votre vrai prénom">
            </fieldset>
            <fieldset>
                <label for="newLastName">Votre nom n'est pas <span class="bold-text">{{ userProfile.lastName }}</span> ?</label>
                <input id="newLastName" placeholder="Votre vrai nom">
            </fieldset>
            <!-- <fieldset>
                <label for="newEmail">Votre nom n'est pas <span class="bold-text">{{ userProfile.email }}</span> ?</label>
                <input id="newEmail" placeholder="Votre adresse email" type="email">
            </fieldset>
            <fieldset>
                <label for="newPassword">Vous souhaitez changer de mot de passe</label>
                <input id="newPassword" placeholder="Votre nouveau mot de passe" type="password">
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
                lastName: "",
                // email: "",
                // password: "",
                avatarUrl: ""
            },
            bearer: 'Bearer ' + localStorage.getItem("token")
        }
    },
    methods: {
        setProfile() {
            this.userProfile.userID = localStorage.getItem("userID");
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': this.bearer,
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.userProfile.firstName = data[0].firstName;
                    this.userProfile.lastName = data[0].lastName;
                    // this.userProfile.email = data[0].email;
                    // this.userProfile.password = data[0].password;
                    this.userProfile.avatarUrl = data[0].avatarUrl;
                })
                .catch(error => console.log(error))
        },
        updateAvatar(event) {
            console.log(event.target.files[0]);
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append("image", image);
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }`;
            let options = {
                method: "POST",
                headers: {
                    'Authorization': this.bearer,
                    // 'Content-Type': 'application/json'
                },
                body: formData
            };
            fetch(url, options)
                .then(res => res.json())
                .catch(error => console.log(error))
        },
        modifyProfile() {
            let profileToSend = {
                newFirstName: document.getElementById("newFirstName").value,
                newLastName: document.getElementById("newLastName").value,
                // newEmail: document.getElementById("newEmail").value,
                // newPassword: document.getElementById("newPassword").value,
            };
            console.log(profileToSend);
            let url = `http://localhost:3000/api/user/${ this.userProfile.userID }`;
            let options = {
                method: "PUT",
                headers: {
                    'Authorization': this.bearer,
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
                    'Authorization': this.bearer,
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, options)
                .then(res => res.json())
                .then(this.$router.push("/inscription"))
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