
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


// import Vue from 'vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyAp_uKvUXPyMJ8ab7K1WWUH3rLVLAQIghM",
//   authDomain: "project-69cc1.firebaseapp.com",
//   projectId: "project-69cc1",
//   storageBucket: "project-69cc1.appspot.com",
//   messagingSenderId: "901669442942",
//   appId: "1:901669442942:web:de88006259af16043c0f2f",
// };

// firebase.initializeApp(firebaseConfig);


createApp(App)
  .use(router)
  .mount("#app");

