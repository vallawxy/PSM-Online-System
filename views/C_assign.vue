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
          <router-link to="/C_assign">Lecturer</router-link>
        </li>
        <li>
          <router-link to="/ManageStudent">Student</router-link>
        </li>
        <li>
          <router-link to="/ManageProposal">Proposal</router-link>
        </li>
        <li>
          <router-link to="" @click="Logout">Logout</router-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="p-4 p-md-5 pt-5">
      <div class="adminHome">
        <!-- <h1 align="right"> Welcome, {{ name }}</h1> -->
        <h1>Lecturers Domain</h1>
 
      </div>

      <!-- <LecturerCreate/> -->
        <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Department</th>
          <th scope="col">Domain</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, email, department, domain } in users" :key="id">
          <td width="15%">{{ name }}</td>
          <td width="15%">{{ email }}</td>
          <td width="15%">{{ department }}</td>
          <td width="15%">{{ domain }}</td>
          <td width="10%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/C_assign_L/${id}`">
                <button class="btn btn-primary mx-1">
                  Assign Domain
                </button>
              </router-link>

            </div>
          </td>
        </tr>
        
      </tbody>
 
    </table>
  </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase";
import { useLoadUsers} from "@/firebase";
// import LecturerCreate from "../components/LecturerCreate.vue";
// import UserList from "../components/LecturerList.vue";
import "../style.css";
export default {
 
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
    const users = useLoadUsers();
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
      users
    };
  },
};
</script>

<style></style>
