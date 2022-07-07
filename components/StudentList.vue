<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Program</th>
          <th scope="col">Session</th>
          <th scope="col">Semester</th>
          <th scope="col">Evaluator 1</th>
          <th scope="col">Evaluator 2</th>
          <th scope="col">Assign</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projectList" :key="project.key">
          <td width="13%">{{ project.student.name }}</td>
          <td width="13%">{{ project.student.email }}</td>
          <td width="13%">{{ project.student.program }}</td>
          <td width="13%">{{ project.student.session }}</td>
          <td width="13%">{{ project.student.semester }}</td>


          <td v-if="project.evaluator1" width="13%">{{ project.evaluator1.name }}</td>
          <td v-if="!project.evaluator1" width="13%">-</td>

          <td v-if="project.evaluator2" width="13%">{{ project.evaluator2.name }}</td>
          <td v-if="!project.evaluator2" width="13%">-</td>
          <!-- <td width="13%project.student.">{{ evaluator1.name }}</td>
          <td width="13%">{{ evaluator2.name }}</td> -->
          <td width="10%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/C_assign_E/${project.key}`">
                <button class="btn btn-primary mx-1">
                  Evaluator
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

import { db } from "@/firebase";

export default {
  data() {
    return {
      projectList : []
    }
  },
  created() {
    db.collection("project").onSnapshot((snapshotChange) => {
      this.projectList = [];
      snapshotChange.forEach((doc) => {
        this.projectList.push({
          key: doc.id,
          ...doc.data(),
        });
      });
      console.log(this.projectList);
    });
  },
  methods: {

  },

};
</script>
