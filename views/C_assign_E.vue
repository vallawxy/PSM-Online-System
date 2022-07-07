<template>
  <div class="card card-body mt-4">
    <h3>Assign Evaluator</h3>
    <br>
 <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
             
        <tr>
              <th style="width: 320px;">Evaluator 1</th>
              <td>
                <p v-if="!loaded" style="margin: 0.5rem;">Loading</p>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="e1"
                  required
                  v-if="loaded"
                >
                  <option disabled value="">Please select one</option>
                  <option v-for="lect in filteredLectList" :key="lect.key" v-bind:value="lect">{{
                    lect.name
                  }}</option>
                </select>
              </td>
            </tr>

               <tr>
              <th style="width: 320px;">Evaluator 2</th>
              <td>
                <p v-if="!loaded" style="margin: 0.5rem;">Loading</p>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="e2"
                  required
                  v-if="loaded"
                >
                  <option disabled value="">Please select one</option>
                  <option v-for="lect in filteredLectList" :key="lect.key" v-bind:value="lect">{{
                    lect.name
                  }}</option>
                </select>
              </td>
            </tr>

          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/ManageStudent" class="btn btn-danger m-1"
              >Back</router-link
            >
            <input type="submit" class="btn btn-primary m-1" value="Submit" />
          </div>
        </div>
      </form>
    </center>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      committeeList : [],
      lecturerList : [],
      filteredLectList : [],
      currentProject : {},
      e1 : '',
      e2 : '',
      loaded : false,
    }
  },
  created() {
    const fetchProject = new Promise((resolve) => {
      db.collection("project").doc(this.$route.params.id).get().then((doc) => {
        this.currentProject = {
          key: doc.id,
          ...doc.data()
        }
        resolve(true);
      })
    })

    const fetchLect = new Promise((resolve) => {
        db.collection("lecturers").onSnapshot((snapshotChange) => {
          this.lecturerList = [];
          snapshotChange.forEach((doc) => {
            this.lecturerList.push({
              key: doc.id,
              ...doc.data(),
            });
          });
          console.log(this.lecturerList);
          resolve(true);
        });
      })

    const fetchCmt = new Promise((resolve) => {
        db.collection("committee").onSnapshot((snapshotChange) => {
          this.committeeList = [];
          snapshotChange.forEach((doc) => {
            this.committeeList.push({
              key: doc.id,
              ...doc.data(),
            });
          });
          console.log(this.committeeList);
          resolve(true);
        });
      })

    Promise.all([fetchLect, fetchCmt, fetchProject]).then(() => {

      this.filteredLectList = []
      for(let lect of this.lecturerList) {
        var hide = false;
        for(let cmt of this.committeeList) {
          if(lect.email == cmt.email || lect.email == this.currentProject.supervisor.email || this.currentProject.project != lect.domain) {
            hide = true;
          }
        }
        if(!hide) {
          this.filteredLectList.push(lect);
        }
      }
      
      console.log(this.filteredLectList);
      
      this.loaded = true;
      

    })
  },
  methods: {
    update() {
      if(this.e1.email == this.e2.email) {
        alert('Select different evaluators.')
        return;
      }

      console.log(this.e1, this.e2);
      db.collection('project').doc(this.$route.params.id).update({
        evaluator1Id: this.e1.key,
        evaluator2Id: this.e2.key,
        evaluator1: this.e1,
        evaluator2: this.e2
      }).then(() => {
        this.$router.push("/ManageStudent");
      })
    }
  },
};
</script>