<template>
  <div class="jumbotron text-center">
    <h1>PSM 1</h1>
    <p>School of Computing, UTM</p>
  </div>
  <hr />
  <div class="login">
    <h2>Login</h2>
    <div align="center">
      <form @submit.prevent="Login">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Email</th>
              <td>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  required
                />
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Password</th>
              <td>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
  
      
        <button type="submit" class="btn btn-dark">
          Login
        </button>
        <br>
        <p>
          Need an account?<router-link to="/studentReg"
            >Register Here</router-link
          >
        </p>
      </form>
    </div>

  </div>
</template>

<script>

import firebase from "firebase";
import { db } from "@/firebase";


export default {
  data() {
    return {
      studentData: [],
      email: '',
      password: '',
    };
  },
  created() {
    db.collection("student").onSnapshot((snapshotChange) => {
      this.studentData = [];
      snapshotChange.forEach((doc) => {
        this.studentData.push({
          key: doc.id,
          email: doc.data().email,
        });
      });
      console.log(this.studentData);
    });
  },
  methods: {
    Login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          for (let student of this.studentData) {
            if (student.key === data.user.uid) {
              this.$router.push("/studentProfile");
            }
          }

          this.$router.push("/adminHome");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    readStudentData() {
      this.studentData = [];
      db.collection("student")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.studentData.push({
              id: doc.id,
              name: doc.data().email,
            });
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    mounted() {
      this.readStudentData();
    },
  },
};
</script>

<style></style>
