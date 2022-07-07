<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar" :class="{ active: isActive }" @click.prevent="toggle">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" class="btn btn-primary">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <h1><a class="logo">PSM1</a></h1>
      <ul class="list-unstyled components mb-5">
        <li>
          <router-link to="/studentDashboard">Dashboard</router-link>
        </li>
        <li class="active">
          <router-link to="/studentProfile">Profile</router-link>
        </li>
        <li>
          <router-link to="/SupervisorSelect">Supervisor</router-link>
        </li>
        <li>
          <router-link to="/submitProposal">Proposal</router-link>
        </li>
        <li>
          <router-link to="" @click="Logout">Logout</router-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="p-4 p-md-5 pt-5">
      <div class="adminHome">
        <h4 align="right">Welcome, {{ name }}</h4>
        <h1>Profile</h1>
        <div class="card card-body mt-4">
          <center>
            <form>
              <table
                class="w3-table w3-center table-hover table-bordered "
                style="width: 640px;"
              >
                <tbody class="text-center">
                  <tr>
                    <th style="width: 320px;">Name</th>
                    <td class="form-control">{{ currentStudent.name }}</td>
                  </tr>
                  <tr>
                    <th style="width: 320px;">Progarm Code</th>
                    <td class="form-control">{{ currentStudent.program }}</td>
                  </tr>
                  <tr>
                    <th style="width: 320px;">Email</th>
                    <td class="form-control">
                      {{ currentStudent.email }}
                    </td>
                  </tr>
                  <tr>
                    <th style="width: 320px;">Matric</th>
                    <td class="form-control">{{ currentStudent.matric }}</td>
                  </tr>
                  <tr>
                    <th style="width: 320px;">Session</th>
                    <td class="form-control">{{ currentStudent.session }}</td>
                  </tr>
                  <tr>
                    <th style="width: 320px;">Semester</th>
                    <td class="form-control">{{ currentStudent.semester }}</td>
                  </tr>
                </tbody>
              </table>
              <div align="right" class="w3-bar">
                <router-link :to="`/studentPfEdit/${id}`">
                  <!-- <button class="btn btn-primary mx-1">
                    Edit
                  </button> -->
                </router-link>
              </div>
            </form>
          </center>
        </div>
      </div>
    </div>
    <!-- i am a line  -->
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useLoadPf, db } from "@/firebase";
import firebase from "firebase";
export default {
  data: () => ({
    isActive: false,
    currentStudent: {}
  }),

  created() {
    // console.log('user', firebase.auth().currentUser);

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        db.collection('student').doc(user.uid).get().then((studentData) => {
          this.currentStudent = studentData.data();
          console.log(this.currentStudent);
        })
      }
      
    })

    
  },
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

    const Pf = useLoadPf();
    return { Pf, name, Logout };
  },
};
</script>

<style></style>
