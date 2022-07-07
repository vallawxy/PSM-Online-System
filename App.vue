<template>
  <router-view />
</template>

<script>
import firebase from "firebase";
import { db } from "@/firebase";

export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        if (
          this.$route.path == "/studentReg"
        ) {
          console.log("stay in register");
        } else {
          this.$router.replace("/login");
        }
      } else {
        console.log(user);
        if (this.$route.path == "/login" || this.$route.path == "/") {
          db.collection("committee")
            .get()
            .then((snapshotChange) => {
              let isCmt = false;
              console.log("cmt");
              snapshotChange.forEach((doc) => {
                if (doc.data().email == user.email) {
                  isCmt = true;
                  this.$router.push("/C_assign");
                }
              });

              if (!isCmt) {
                db.collection("lecturers")
                  .get()
                  .then((snapshotChange) => {
                    console.log("lect");
                    snapshotChange.forEach((doc) => {
                      if (doc.id == user.uid) {
                        if (this.$route.path == "/lecturerCreate") {
                          this.$router.push("/adminHome");
                        } else {
                          this.$router.push("/evaluateStudent");
                        }
                      }
                    });
                  });
              }
            });

          db.collection("student")
            .get()
            .then((snapshotChange) => {
              snapshotChange.forEach((doc) => {
                if (doc.id == user.uid) {
                  this.$router.push("/studentDashboard");
                }
              });
            });

          this.$router.push("/adminHome");
        } else {
          db.collection("committee")
            .get()
            .then((snapshotChange) => {
              let isCmt = false;
              snapshotChange.forEach((doc) => {
                if (doc.data().email == user.email) {
                  isCmt = true;
                  console.log("cmt");
                  let pages = [
                    "/ManageStudent",
                    "/C_assign",
                    "/ManageProposal",
                  ];
                  if (!pages.includes(this.$route.path)) {
                    this.$router.push("/C_assign");
                  }
                }
              });

              if (!isCmt) {
                db.collection("lecturers")
                  .get()
                  .then((snapshotChange) => {
                    console.log("lect");
                    snapshotChange.forEach((doc) => {
                      if (doc.id == user.uid) {
                        let pages = ["/evaluateStduent", "/SuperviseStudent"];
                        if (this.$route.path == "/lecturerCreate") {
                          this.$router.push("/adminHome");
                        } else if (
                          !pages.includes(this.$route.path) &&
                          this.$route.path != "/lecturerCreate"
                        ) {
                          this.$router.push("/evaluateStudent");
                        }
                      }
                    });
                  });
              }
            });

          db.collection("student")
            .get()
            .then((snapshotChange) => {
              snapshotChange.forEach((doc) => {
                if (doc.id == user.uid) {
                  let pages = [
                    "/studentProfile",
                    "/studentDashboard",
                    "/SupervisorSelect",
                    "/submitProposal",
                  ];
                  if (!pages.includes(this.$route.path)) {
                    this.$router.push("/studentProfile");
                  }
                }
              });
            });

          let pages = ["/adminHome", "/ap", "/manageC"];
          if (!pages.includes(this.$route.path)) {
            this.$router.push("/adminHome");
          }
        }
      }
    });
  },

};
</script>

<style lang="scss">
body {
  background: #ffffff;
  color: black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

a {
  color: inherit;
}
</style>
