<template>
  <button v-if="showPDF" class="btn btn-primary m-1" @click="viewPDF">
    General Agreement
  </button>
  <div class="card mt-4">
    
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Department</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in applicationList" :key="application.key">
          <td width="25%">{{ application.supervisor.name }}</td>
          <td width="25%">{{ application.supervisor.email }}</td>
          <td width="25%">{{ application.supervisor.department }}</td>
          <td width="20%">{{ application.status }}</td>
        </tr>
      </tbody>
      <!-- <Page :total="100" /> -->
    </table>
  </div>
</template>

<script>
import { db } from "@/firebase";
import firebase from "firebase";

export default {

  data() {
    return {
      applicationList : [],
      showPDF : false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        db.collection('student-supervisor').where('studentId','==',user.uid).onSnapshot((snapshotChange) => {
          this.applicationList = [];
          snapshotChange.forEach((doc) => {
            if(doc.data().status == 'approved') {
              this.showPDF = true;
            }
            this.applicationList.push({
                key: doc.id,
                ...doc.data(),
            });
          });
        });
      }
    })
    
  },
  methods: {
    viewPDF() {
      window.open("https://firebasestorage.googleapis.com/v0/b/project-69cc1.appspot.com/o/general%20agreement.pdf?alt=media&token=e47c0939-00f9-4263-a6dd-65ffd425a726", '_blank');
    }
  },
};
</script>













