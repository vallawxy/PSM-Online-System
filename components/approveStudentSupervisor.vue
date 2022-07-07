<template>

 <div id="content" class="p-4 p-md-5 pt-5">
      <div class="adminHome">
        <!-- <h1 align="right"> Welcome, {{ name }}</h1> -->
        <h1>Supervisor application</h1>
        <div align="right ">
          <router-link to="/ManageStudent" class="btn btn-success " 
            >Back</router-link>
          
        </div>
      </div>


  <div class="card mt-4">
    <table  class="table m-0">
      <thead>
        <tr>
          <th scope="col">Student Name</th>
          <th scope="col">Lecturer Name</th>
          <th scope="col">Lecturer Email</th>
          <th scope="col">Lecturer Department</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in applicationList" :key="application.key">
          <td width="25%">{{ application.student.name }}</td>
          <td width="25%">{{ application.supervisor.name }}</td>
          <td width="25%">{{ application.supervisor.email }}</td>
          <td width="25%">{{ application.supervisor.department }}</td>
          <td width="15%">
            <div class="w-100 btn-group" role="group">
              <button
                @click="approve(application.key)"
                class="btn btn-primary mx-1"
              >
                Approve
              </button>

              <button
                @click="reject(application.key)"
                class="btn btn-danger mx-1"
              >
                Reject
              </button>
            </div>

            <!-- 
              <button @click="approve(application.key)" class="btn btn-success">Approve</button>

              <button  class="btn btn-danger">Reject</button> -->
          </td>
        </tr>
      </tbody>
      <!-- <Page :total="100" /> -->
    </table>
  </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      applicationList: [],
    };
  },
  created() {
    db.collection("student-supervisor")
      .where("status", "==", "pending")
      .onSnapshot((snapshotChange) => {
        this.applicationList = [];
        snapshotChange.forEach((doc) => {
          this.applicationList.push({
            key: doc.id,
            ...doc.data(),
          });
        });
        console.log(this.applicationList);
      });
  },
  methods: {
    approve(id) {
      db.collection("student-supervisor")
        .doc(id)
        .update({
          status: "approved",
        })
        .then(() => {
          alert("Application approved.");
        });
    },

    reject(id) {
      db.collection("student-supervisor")
        .doc(id)
        .update({
          status: "rejected",
        })
        .then(() => {
          alert("Application rejected.");
        });
    },
  },
};
</script>
<style>

</style>