<template>
  <div class="register">
    <h1>Register</h1>
    <form id="signup-form" @submit.prevent="Register">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="text" placeholder="Role" v-model="role" />

      <input type="submit" placeholder="Register" />
      <p>Have an account?<router-link to="/login">Login Here</router-link></p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { ref } from "vue";
import { db } from "@/firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const role = ref("");

    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              role: role.value,
            });

          // alert(cred);
        })
        .catch((err) => alert(err.message));
    };
    return {
      Register,
      email,
      password,
      role,
    };
  },
};
</script>

<style></style>
