<template>
  <div class="card card-body mt-4">
    <h3>Evaluate Proposal</h3>
    <br />
    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Status</th>
              <td>

                  
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="status"
                  required
                >
                  <option disabled value="">Please select</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Accepted with conditions">Accepted with conditions</option>
                  <option value="Rejected">Rejected </option>
                </select>
              </td>
            </tr>

            <tr>
              <th style="width: 320px;">Comments</th>
              <td>
                <textarea
                          v-model="comment"
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
              </td>
            </tr>
        
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/EvaluateStudent" class="btn btn-danger m-1"
              >Back</router-link
            >
            <input type="submit" class="btn btn-primary m-1" value="Update" />
          </div>
        </div>
      </form>
    </center>
  </div>
</template>

<script>

import { db } from "@/firebase";
import firebase from "firebase";

export default {
  data() {
    return {
      comment: '',
      status: '',
      currentEvaluator: {},
      currentProject: {}
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        db.collection('lecturers').doc(user.uid).get().then((doc) => {
          this.currentEvaluator = {
            key: doc.id,
            ...doc.data()
          }
        })
      }
    })

    db.collection('project').doc(this.$route.params.id).get().then((doc) => {
      this.currentProject = {
        key: doc.id,
        ...doc.data()
      }
    })

  },
  methods: {
    update() {
      console.log(this.$route.params.id);
      console.log(this.comment, this.status);

      if(this.currentProject.evaluator1Id == this.currentEvaluator.key) {
        db.collection('project').doc(this.$route.params.id).update({
          evaluationStatus: this.status,
          evaluationComment1: this.comment
        }).then(() => {
          this.$router.push('/EvaluateStudent')
        })
      } else if(this.currentProject.evaluator2Id == this.currentEvaluator.key) {
        db.collection('project').doc(this.$route.params.id).update({
          evaluationStatus: this.status,
          evaluationComment2: this.comment
        }).then(() => {
          this.$router.push('/EvaluateStudent')
        })
      }
      
    }
  },
  
};
</script>



