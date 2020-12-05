<template>

    <div class="post-comment-container">

        <div class="post" :postID="postID">
            <div class="post-info">
                <div class="post-info-sender">
                    <img class="post-info-sender-avatar" :src="userInfo.avatarUrl" alt="">
                    <h3 class="post-info-sender-name">{{ userInfo.firstName }} {{ userInfo.lastName }} </h3>
                </div>
                <div class="post-info-time">
                    <h3>Posté le {{ convertDate }}</h3>
                    <img v-if="postInfo.userID == visitorID" @click="deletePost" src="../assets/trash.png" alt="">
                </div>
            </div>
            <div class="post-content">
                <p v-if="updateMessage.lenght >= 1" class="alert-msg">{{ updateMessage }}</p>
                <img class="post-content-gif" :src="postInfo.gifUrl" alt="">
                <div class="post-content-text">
                    <div>
                        <h2>{{ postInfo.title }}</h2>
                        <p>{{ postInfo.text }}</p>
                    </div>
                    <div class="post-claps">
                        <img v-if="postInfo.claps >= 1" @click="clapPost" src="../assets/clap.png" alt="">
                        <img v-else src="../assets/unclap.png" @click="clapPost" alt="">
                        <p>{{ postInfo.claps }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="comment-section">
            <div class="comment">
                <p class="comment-info">Le 12/12/2020, Nom de l'Utilisateur a répondu :</p>
                <p class="comment-content">" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lacinia augue a pulvinar. Donec convallis finibus justo, non blandit augue. "</p>
            </div>
            <div class="new-comment">
                <textarea id="new-comment" placeholder="Commentez cette publication" rows="3" cols="10"></textarea>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Post",
        props: {
            postID: {
                type: Number
            }
        },
        data: () => {
            return {
                postInfo: {
                    userID: "",
                    dateSend: "",
                    title: "",
                    gifUrl: "",
                    text: "",
                    claps: ""
                },
                userInfo : {
                    avatarUrl : "",
                    firstName: "",
                    lastName: ""
                },
                updateMessage: "",
                visitorID: localStorage.getItem("userID")
            }
        },
        computed: {
            convertDate() {
                let date = this.postInfo.dateSend.split(/[- T :]/);
                let convertDate = `${date[2]}/${date[1]}/${date[0]}`;
                return convertDate;
            }
        },
        methods: {
            getPostInfo() {
                let url = `http://localhost:3000/api/post/${ this.postID }`;
                let options = {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then(response => response.json())
                    .then((data) => {
                        if (data[0].postTitle) {
                            this.postInfo.title = data[0].postTitle;
                            this.postInfo.gifUrl = data[0].gifUrl;
                            this.postInfo.text = data[0].postText;
                            this.postInfo.claps = data[0].claps;
                            this.postInfo.dateSend = data[0].dateSend;
                            this.postInfo.userID = data[0].userID;
                            this.getUserInfo();
                        }
                        else {
                            this.updateMessage = data.message;
                        }
                    })
                    .catch(error => console.log(error))
            },
            getUserInfo() {
                let url = `http://localhost:3000/api/user/${ this.postInfo.userID }`;
                let options = {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
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
            },
            deletePost() {
                let url = `http://localhost:3000/api/post/${ this.postID }`;
                let options = {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then(response => response.json())
                    .then(() => {
                        this.$emit("post-deleted");
                    })
                    .catch(error => console.log(error))
            },
            clapPost() {
                let url = `http://localhost:3000/api/post/${ this.postID }`;
                let options = {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                };
                fetch(url, options)
                    .then(response => response.json())
                    .then(() => {
                        this.getPostInfo();
                    })
                    .catch(error => console.log(error))
            }
        },
        mounted() {
            this.getPostInfo();
        }
    }
</script>

<style lang="css">
  @import '../style/style.css'
</style>