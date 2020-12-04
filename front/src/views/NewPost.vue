<template>
    <div id="container">
        <HomeNav />
        <h1>Ajouter une publication</h1>
        <form v-on:submit.prevent="publish">
            <fieldset>
                <label for="post-title">Titre *</label>
                <input
                    v-model="postInfo.title"
                    type="text"
                    id="post-title"
                    name="post-title"
                    placeholder="Titre de votre publication"
                    required />
            </fieldset>
            <fieldset>
                <label for="gif-url">URL du gif</label>
                <input
                    v-model="postInfo.gifUrl"
                    type="text"
                    id="gif-url"
                    placeholder="Lien vers la page 9GAG"/>
                <img id="preview">
            </fieldset>
            <fieldset>
                <label for="post-content">Commentaire</label>
                <textarea
                    v-model="postInfo.text"
                    id="post-content"
                    name="post-content">
                </textarea>
            </fieldset>
            <p class="alert-msg">{{ updateMessage }}</p>
            <button type="submit" id="post-upload" >Publier</button>
        </form>
    </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
export default {
    name: 'NewPost',
    components: {
        HomeNav
    },
    data: () => {
        return {
            postInfo : {
                title: "",
                gifUrl: "",
                text: ""
            },
            updateMessage : ""
        }
    },
    methods: {
        publish() {
            let url = "http://localhost:3000/api/post"
            let options = {
                method: "POST",
                body: JSON.stringify(this.postInfo),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    this.updateMessage = res.message;
                    this.postInfo = {}
                })
                .catch(error => {
                    this.errorMessage = error
                })
        }
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>