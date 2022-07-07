<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar" :class="{ active: isActive }" @click.prevent="toggle">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" class="btn btn-primary">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <h1><a  class="logo">PSM1</a></h1>
      <ul class="list-unstyled components mb-5">
        <li class="active">
          <router-link to="/adminHome">Lecturer</router-link>
        </li>
        <li>
          <router-link to="/ap">Academic Program</router-link>
        </li>
        <li>
          <router-link to="/manageC">Committee</router-link>
        </li>
        <li>
          <router-link to="" @click="Logout">Logout</router-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="p-4 p-md-5 pt-5">
      <div class="adminHome">
        <!-- <h1 align="right"> Welcome, {{ name }}</h1> -->
        <h1>Manage Lecturers</h1>
        <div align="right ">
          <router-link to="/lecturerCreate" class="btn btn-success " 
            >Create</router-link
          >
        </div>
      </div>

      <!-- <LecturerCreate/> -->
      <UserList />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase";
// import LecturerCreate from "../components/LecturerCreate.vue";
import UserList from "../components/LecturerList.vue";
import "../style.css";
export default {
  name: "side",
  components: {
    // LecturerCreate,
    UserList,
  },
  data: () => ({
    isActive: false,
  }),
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
  setup() {
    const name = ref("");
    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });

    const Logout = () => {
      if (confirm("Are you sure?")) {
        firebase
          .auth()
          .signOut()
          .then(() => console.log("Signed out"))
          .catch((err) => alert(err.message));
      }
    };
    return {
      name,
      Logout,
    };
  },
};
</script>

<style></style>
