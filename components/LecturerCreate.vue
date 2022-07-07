<template>
  <div class="card card-body mt-4">
    <h3>Create Lecturers</h3>
    <br />
    <div align="center">
      <form @submit.prevent="Register">
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
            <tr>
              <th style="width: 320px;">Name</th>
              <td>
                <input v-model="name" class="form-control" required />
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Department</th>
              <td>
                <input v-model="department" class="form-control" required />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/adminHome" class="btn btn-danger m-1"
              >Back</router-link
            >
            <input type="submit" class="btn btn-primary m-1" value="Create" />
          </div>
        </div>
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
 
      email: '',
      name: '',
      department: '',
    };
  },

  methods: {
    Register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((cred) => {

          return db
            .collection("lecturers")
            .doc(cred.user.uid)
            .set({
              email: this.email,
              name: this.name,
              department: this.department,
            
            }).then(() => {
              firebase.auth().signInWithEmailAndPassword('testing@hotmail.com', '123456').then(() => {
                this.$router.push('/adminHome');
              })
              this.$router.push('/adminHome');
            })
           

          // alert(cred);
        })
        

        // .catch((err) => alert(err.message));

    },

  },
};
</script>

<style></style>
