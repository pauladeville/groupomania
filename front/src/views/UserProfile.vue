<template>
    <div id="container">
        <HomeNav />
        <h1>Mon profil</h1>
        <form name="profil">
            <fieldset>
                <label for="new-lastName">Nouveau nom</label>
                <input id="new-lastName" class="focus" placeholder="Nom" name="new-ast_name" required>
            </fieldset>
            <fieldset>
                <label for="new-firstname">Nouveau prénom</label>
                <input id="new-firstName" placeholder="Prénom" name="new-first_name" required>
            </fieldset>
            <fieldset>
                <label for="new-email">Nouvel email</label>
                <input id="new-email" placeholder="Email" type="email" name="new-email" required>
            </fieldset>
            <fieldset>
                <label for="new-password">Nouveau mot de passe</label>
                <input id="new-password" placeholder="Email" type="email" name="new-password" required>
            </fieldset>
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
    }
}
</script>

<style lang="css">
  @import '../style/style.css'
</style>