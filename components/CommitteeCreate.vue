<template>
  <div class="card card-body mt-4">
    <h3>Create Committees</h3>
    <br />
    <div align="center">
      <form @submit.prevent="onSubmit">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Lecturer Email</th>
              <td>
                <!-- <select 
            class="form-select"
            aria-label="Default select example"
            v-model="user.name"
            required
          >
    
            <option v-for="{ id, name } in users" :key="id">{{ name }}</option>
          </select> -->

                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="user.email"
                  required
                  v-if="loaded"
                >
                  <option disabled value="">Please select one</option>
                  <option v-for="lect in filteredLectList" :key="lect.jey">{{
                    lect.email
                  }}</option>
                </select>
                <p v-if="!loaded" style="margin: 0.5rem;">Loading...</p>
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Academic Program</th>
              <td>
    
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="user.program"
                  required
                >
                  <option disabled value="">Please select one</option>
                  <option v-for="{ id, name } in AP" :key="id">{{
                    name
                  }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/manageC" class="btn btn-danger m-1"
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
import { createCm } from "@/firebase";
import { reactive } from "vue";
import { useLoadUsers } from "@/firebase";
import { useLoadAP, db } from "@/firebase";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      committeeList : [],
      lecturerList : [],
      filteredLectList : [],
      loaded : false
    }
  },
  
  method: {
    
    
  },

  created() {
    this.loaded = false;
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

    Promise.all([fetchLect, fetchCmt]).then(() => {
      this.filteredLectList = []
      for(let lect of this.lecturerList) {
        var hide = false;
        for(let cmt of this.committeeList) {
          if(lect.email == cmt.email) {
            hide = true;
          }
        }
        if(!hide) {
          this.filteredLectList.push(lect);
        }
      }
      this.loaded = true;
      console.log(this.filteredLectList);
    })

    
  },

  setup() {
    const router = useRouter();
    const AP = useLoadAP();
    const users = useLoadUsers();
    const user = reactive({ email: "", program: "" });
    const onSubmit = async () => {
      await createCm({ ...user });
      user.email = "";
      user.program = "";
       router.push("/manageC");
    };
    return { user, onSubmit, users, AP };
  },
};
</script>

<style>

</style>
