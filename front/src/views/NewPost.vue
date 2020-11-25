<template>
    <div id="container">
        <HomeNav />
        <h1>Ajouter une publication</h1>
        <form name='newpost'>
            <fieldset>
                <label for="title">Titre</label>
                <input type="text" class="focus" id="title" name="title" placeholder="Titre">
            </fieldset>
            <fieldset>
                <label for="media">Media</label>
                <input type="file"  class="focus imagepost" id="media" name="media" accept="image/*">
                <img id="preview" class="">
            </fieldset>
            <fieldset>
                <label for="content">Contenu de l'article</label>
                <textarea class="focus" id="content" name="content"></textarea>
            </fieldset>
            <button type="submit" id="upload">Publier le post</button>
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