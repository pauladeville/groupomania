<template>
    <div id="container">
        <h1>Inscription à Groupomania :</h1>
        <form name="inscription">
            <fieldset>
                <label for="firstname">Prénom *</label>
                <input type="text" class="focus" id="firstname" pattern="^\D*$" required
                    placeholder="Renseignez votre prénom" name="firstname">
            </fieldset>
            <fieldset>
                <label for="lastname">Nom *</label>
                <input type="text" class="focus" id="lastname" pattern="^\D*$" required autofocus
                    placeholder="Renseignez votre nom de famille" name="lastname">
            </fieldset>
            <fieldset>
                <label for="email">Email *</label>
                <input type="email" class="focus" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                    placeholder="Entrez une adresse mail valide" name="email">
            </fieldset>
            <fieldset>
                <label for="password">Mot de passe *</label>
                <input type="password" class="focus" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                    placeholder="Renseignez votre mot de passe" name="password">
            </fieldset>
            <button type="submit" id="inscription" class="focus">S'inscrire</button>
            <button type="reset" class="focus">Réinitialiser</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SignUp'
}
</script>