<template>
  <div class="card card-body mt-4">
    <h3>Student Register</h3>
    <br />
    <center>
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
              <th style="width: 320px;">Program Code</th>
              <td>
                <input v-model="program" class="form-control" required />
              </td>
            </tr>

            <tr>
              <th style="width: 320px;">Matric Number</th>
              <td>
                <input
                  type="text"
                  v-model="matric"
                  class="form-control"
                  required
                />
              </td>
            </tr>

            <tr>
              <th style="width: 320px;">Academic Session</th>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="session"
                  required
                >
                  <option disabled value="">Please select</option>
                  <option>2020/2021 </option>
                  <option>2021/2022</option>
                </select>
              </td>
            </tr>

            <tr>
              <th style="width: 320px;">Semester</th>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="semester"
                  required
                >
                  <option disabled value="">Please select</option>
                  <option>1 </option>
                  <option>2</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <!-- <input type="submit" placeholder="Register" /> -->
        <button type="submit" class="btn btn-dark">
          Register
        </button>
        <br />
        <br />
        <p>Have an account?<router-link to="/login">Login Here</router-link></p>
      </form>
    </center>
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
      program: '',
      session: '',
      semester: '',
      matric: '',
    };
  },

  methods: {
  Register  () {
      firebase
        .auth()
        .createUserWithEmailAndPassword( this.email,  this.password)
        .then((cred) => {
          return db
            .collection("student")
            .doc(cred.user.uid)
            .set({
              email:  this.email,
              name:  this.name,
              program:  this.program,
              session:  this.session,
              semester:  this.semester,
              matric:  this.matric,
            }).then(() => {
              this.$router.push("/studentProfile");
            })
            
        })
        .catch((err) => alert(err.message));
        
    },

  },
};
</script>

<style></style>
