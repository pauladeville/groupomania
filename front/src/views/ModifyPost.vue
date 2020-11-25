<template>
    <div id="container">
        <HomeNav />
        <h1>Modifier cette publication</h1>
        <form>
            <fieldset>
                <label>Titre</label>
                <input id="new-title" name="new-title" placeholder="Titre" required />
            </fieldset>
            <fieldset>
                <label for="post">Nouveau contenu</label>
                <textarea id="new-post" name="post"></textarea>
            </fieldset>
        <button id="btn-post" type="submit">Modifier</button>
        <button id="delete-post" >Supprimer</button>
        </form>
    </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
export default {
    name: 'ModifyPost',
    components: {
        HomeNav
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>