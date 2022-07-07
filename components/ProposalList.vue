<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Student Name</th>
          <!-- <th scope="col">Project Title</th>
          <th scope="col">Project Type</th> -->
          <th scope="col">Proposal Status</th>
          <th scope="col">Proposal Comments</th>
           <th scope="col">Proposal Details</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proposal in proposalList" :key="proposal.key">
          <td width="15%">{{ proposal.student.name }}</td>
          <!-- <td width="15%">{{ proposal.title }}</td>
          <td width="15%">{{ proposal.project }}</td> -->
          <td width="15%">{{ proposal.evaluationStatus }}</td>
          <td width="15%" v-if="proposal.evaluator1Id == currentUID">
            {{ proposal.evaluationComment1 }}
          </td>
          <td width="15%" v-if="proposal.evaluator2Id == currentUID">
            {{ proposal.evaluationComment2 }}
          </td>

              <td width="4%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/ProposalDetail/${proposal.key}`">
                <!-- <router-link to="/Evaluate"> -->
                <button class="btn btn-success mx-1">
                  Project
                </button>
              </router-link>
            </div>
          </td>

          <td width="1%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/Evaluate/${proposal.key}`">
                <!-- <router-link to="/Evaluate"> -->
                <button class="btn btn-primary mx-1">
                  Evaluate
                </button>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadProject, deleteProject } from "@/firebase";

import { db } from "@/firebase";
import firebase from "firebase";

export default {
  data() {
    return {
      proposalList: [],
      currentUID: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUID = user.uid;

        const eva1 = new Promise((resolve) => {
          db.collection("project")
            .where("evaluator1Id", "==", user.uid)
            .onSnapshot((snapshotChange) => {
              let tmp = [];
              snapshotChange.forEach((doc) => {
                tmp.push({
                  key: doc.id,
                  ...doc.data(),
                });
              });
              resolve(tmp);
            });
        });

        const eva2 = new Promise((resolve) => {
          db.collection("project")
            .where("evaluator2Id", "==", user.uid)
            .onSnapshot((snapshotChange) => {
              let tmp = [];
              snapshotChange.forEach((doc) => {
                tmp.push({
                  key: doc.id,
                  ...doc.data(),
                });
              });
              resolve(tmp);
            });
        });

        Promise.all([eva1, eva2]).then((data) => {
          this.proposalList = data[0].concat(data[1]);
        });
      }
    });
  },

  methods: {
    download(url) {
      window.open(url, "_blank");
    },
  },

  setup() {
    const users = useLoadProject();
    return { users, deleteProject };
  },
};
</script>
