<template>
<!-- <form @submit.prevent="sendFile" enctype="multipart/form-data"> -->
<div>
        <div v-if="message"
            :class="`message ${error ? 'is-danger' : 'is-success'}`"
            >
            <div class="message-body">
                {{message}}
            </div>
        </div>
  
        <!-- <div class="field">
            <div class="file is-boxed is-primary">
                
                <label class="file-label">

                    <input
                    type="file"
                    ref="file"
                    @change="selectFile"
                    class="file-input"
                    />

                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload">
                            </i>
                        </span>

                    </span>
                </label>
            </div>
        </div> -->
        <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Say something</label>
      <input type="text" id="create-post" v-model="text" placeholder="create a post">
      <button v-on:click="createPost">Post</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
        >
        <p class="text">{{ post.text }}</p>
        <button class="addButton" v-on:click="addToScene(post)">Add To Scene</button>
      </div>
    </div>
  </div>
  <!-- </form> -->
</div>
</template>

<script>
// import axios from 'axios';
import PostService from '../PostService';
//import * as BABYLON from 'babylonjs';
//mport { SceneLoader } from 'babylonjs';
var SceneLoader = require("@babylonjs/core").SceneLoader;
export default {
  name: 'PostComponent',  
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      post_id: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    addToScene(post) {
      console.log(post);
      SceneLoader.ImportMesh(
        "",
        "https://realviewtest1.s3.eu-west-2.amazonaws.com/models/",
        
        post.post_id + ".glb",
        this.$parent.scene, // use the scene object from your parent component
        function (newMeshes) {
          var importedMesh = newMeshes[0];
          console.log(importedMesh);
          // do something with the imported mesh
        }
      );
    },
    // selectFile() {
    //     this.file = this.$refs.file.files[0];
    //     this.error = false;
    //     this.message = "";
    // },
    addFileToList() {
        this.uploadedFiles.push(this.fileName);
        this.fileName = '';   
    }
    // PUSHING THE UPLOADED FILE TO BACKEND
    // async sendFile() {
    //     const formData = new FormData();
    //     formData.append('file', this.file);
    //     try {
    //         await axios.post('api/uploads', formData);
    //         this.message = "File has been uploaded";
    //         this.file = "";
    //         this.error = false;
    //     } catch (err) {
    //         console.log(err);
    //         this.message = err.response.data.error;
    //         this.error = true;
    //     }
    // }
   }
  

};

</script>

<style scoped>

.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.post p {
  margin-right: 10px;
}

.post button {
  width: 100px;
  border: 1px solid #AE98BD;
  background-color: #AE98BD;
}

div.container {
  max-width: 1300px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #AE98BD;
  background-color: #AE98BD;
  padding:  10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 0.5px solid #131313;
  background-color:  #f6f4fd;
  padding: 5px 10px 5px 5px;
  margin-bottom: 10px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>