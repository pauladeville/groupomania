<template>

    <div class="post-comment-container">

        <div class="post" :id="postID">
            <div class="post-info">
                <div class="post-info-sender">
                    <img class="post-info-sender-avatar" :src="userInfo.avatarUrl" alt="">
                    <h3 class="post-info-sender-name">{{ userInfo.firstName }} {{ userInfo.lastName }} </h3>
                </div>
                <div class="post-info-time">
                    <h3>Posté le {{ postInfo.dateSend }}</h3>
                    <img src="../assets/trash.png" alt="">
                </div>
            </div>
            <div class="post-content">
                <img class="post-content-gif" src="https://via.placeholder.com/300" alt="">
                <div class="post-content-text">
                    <h2>{{ postInfo.title }}</h2>
                    <p>{{ postInfo.text }}</p>
                    <div class="post-likes">
                        <img v-if="postInfo.likes >= 1" src="../assets/liked.png" alt="">
                        <img v-else src="../assets/unliked.png" alt="">
                        <p>{{ postInfo.likes }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="comment-section">
            <div class="comment">
                <p class="comment-info">Le 12/12/2020, Nom de l'Utilisateur a répondu :</p>
                <p class="comment-content">" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lacinia augue a pulvinar. Donec convallis finibus justo, non blandit augue. "</p>
            </div>
            <div class="new-comment">
                <textarea id="new-comment" placeholder="Commentez cette publication" rows="3" cols="10"></textarea>
            </div>
        </div> -->
    </div>

</template>

<script>
    export default {
        name: "Post",
        data: () => {
            return {
                postInfo : {
                    postID: "",
                    userID: "",
                    dateSend: "",
                    title: "",
                    gifUrl: "",
                    text: "",
                    likes: ""
                },
                userInfo : {
                    avatarUrl : "",
                    firstName: "",
                    lastName: ""
                }
            }
        },
        methods: {
            getPostInfo() {
            let url = `http://localhost:3000/api/post/${ this.postInfo.postID }`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.postInfo.title = data[0].postTitle;
                    this.postInfo.gifUrl = data[0].gifUrl;
                    this.postInfo.text = data[0].postText;
                    this.postInfo.likes = data[0].likes;
                    this.postInfo.dateSend = data[0].dateSend;
                    this.postInfo.userID = data[0].userID;
                })
                .catch(error => console.log(error))
            },
            getUserInfo() {
            let url = `http://localhost:3000/api/user/${ this.postInfo.userID }`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.userInfo.avatarUrl = data[0].avatarUrl;
                    this.userInfo.firstName = data[0].firstName;
                    this.userInfo.lastName = data[0].lastName;
                })
                .catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="css">
  @import '../style/style.css'
</style>