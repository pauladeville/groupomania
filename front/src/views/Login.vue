<template>
    <div id="container">
        <h1>Connectez-vous :</h1>
        <form method="post" name="connexion">
            <fieldset>
                <label for="email">Email *</label>
                <input type="email" class="form-control focus" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                    placeholder="Entrez une adresse mail valide" name="email">
            </fieldset>
            <fieldset>
                <label for="password">Mot de passe *</label>
                <input type="password" class="form-control focus" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                    placeholder="Renseignez votre mot de passe" name="password">
            </fieldset>
            <button type="submit" id="connexion" class="focus">Se Connecter</button>
            <button type="reset" class="focus">Réinitialiser</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'NewPost'
}
</script>