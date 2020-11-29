<template>
    <div id="container">
        <HomeNav />
        <h1>Ajouter une publication</h1>
        <form name='newpost'>
            <fieldset>
                <label for="post-title">Titre</label>
                <input type="text" id="post-title" name="post-title" placeholder="Titre">
            </fieldset>
            <fieldset>
                <label for="post-media">Media</label>
                <input type="file" id="post-media" name="post-media" accept="image/*">
                <img id="preview">
            </fieldset>
            <fieldset>
                <label for="post-content">Contenu de votre publication</label>
                <textarea id="post-content" name="post-content"></textarea>
            </fieldset>
            <button type="submit" id="post-upload" >Publier le post</button>
        </form>
    </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
export default {
    name: 'NewPost',
    components: {
        HomeNav
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>