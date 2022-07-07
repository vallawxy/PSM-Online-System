<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar" :class="{ active: isActive }" @click.prevent="toggle">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" class="btn btn-primary">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <h1><a class="logo">PSM1</a></h1>
      <ul class="list-unstyled components mb-5">
        <li>
          <router-link to="/EvaluateStudent">Evaluator</router-link>
        </li>
        <li class="active">
          <router-link to="/SuperviseStudent">Supervisor</router-link>
        </li>
        <li>
          <router-link to="" @click="Logout">Logout</router-link>
        </li>
      </ul>
    </nav>
    <div id="content" class="p-4 p-md-5 pt-5">
      <div class="adminHome">
        <!-- <h1 align="right"> Welcome, {{ name }}</h1> -->
        <h1>Supervise Students</h1>
        <div align="right ">
          <!-- <router-link to="/lecturerCreate" class="btn btn-success " 
            >Create</router-link -->
        </div>
      </div>

      <div v-for="session in sessionArray" :key="session" class="form-check form-check-inline">
        <input  type="checkbox" checked="true" value="session" @change="changeSession($event,session)" class="form-check-input"  />
        <label class="form-check-label">{{session}}</label>
      </div>

      <div v-for="semester in semesterArray" :key="semester" class="form-check form-check-inline">
        <input  type="checkbox" checked="true" value="semester" @change="changeSemester($event,semester)" class="form-check-input"  />
        <label class="form-check-label">{{semester}}</label>
      </div>

      <!-- <LecturerCreate/> -->
      <div class="card mt-4">
        <table class="table m-0">
          <thead>
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Session</th>
              <th scope="col">Semester</th>
              <th scope="col">Project</th>
              <!-- <th scope="col">Project Type</th> -->
              <th scope="col">Proposal</th>
              <!-- <th scope="col">Proposal Comments</th> -->
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="proposal in proposalList" :key="proposal.key">
              <td width="20%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">{{ proposal.student.name }}</td>
              <td width="20%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">{{ proposal.student.session }}</td>
              <td width="20%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">{{ proposal.student.semester }}</td>

              <td width="2%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)"><div class="w-100 btn-group" role="group">
              <router-link :to="`/SuperView/${proposal.key}`">
                <!-- <router-link to="/Evaluate"> -->
                <button class="btn btn-success mx-1">
                  Project
                </button>
              </router-link>
            </div></td>


              <!-- <td width="15%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">{{ proposal.title }}</td>
              <td width="15%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">{{ proposal.project }}</td> -->
              <td width="2%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">
                <div class="w-100 btn-group" role="group">
                  <router-link :to="`/proposalResult/${proposal.key}`">
                    <button class="btn btn-info mx-1">
                      View
                    </button>
                  </router-link>
                  <!-- <router-link :to="`/Evaluate/${id}`"> -->
                </div>
              </td>
              <!-- <td width="15%">{{ semester }}</td>
              <td width="15%">{{ semester }}</td> -->
              <td width="2%" v-if="checkedSession.includes(proposal.student.session) || checkedSemester.includes(proposal.student.semester)">
                <div class="w-100 btn-group" role="group">
                  <!-- <router-link :to="`/lecturerEdit/${proposal.key}`"> -->
                    <!-- <button class="btn btn-success mx-1" @click="download(proposal.url)">
                      Download
                    </button> -->
                  <!-- </router-link> -->
                  <router-link :to="`/Supervise/${proposal.key}`">
                    <!-- <router-link to="/Evaluate"> -->
                    <button class="btn btn-primary mx-1">
                      Comment
                    </button>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useLoadProject, deleteUser, db } from "@/firebase";
import firebase from "firebase";
// import LecturerCreate from "../components/LecturerCreate.vue";
// import StudentList from "../components/StudentList.vue";
import "../style.css";
export default {
  //   name: "side",
  //   components: {
  //     // LecturerCreate,
  //     StudentList,
  //   },
  data: () => ({
    isActive: false,
    sessionArray: [],
    semesterArray: [],
    checkedSession: [],
    checkedSemester: [],
    proposalList: []
  }),

   created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        db.collection('project').where('supervisorId','==',user.uid).onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {

            this.proposalList.push({
              key: doc.id,
              ...doc.data()
            })

            if(!this.semesterArray.includes(doc.data().student.semester)) {
              this.semesterArray.push(doc.data().student.semester)
            }

            if(!this.sessionArray.includes(doc.data().student.session)) {
              this.sessionArray.push(doc.data().student.session)
            }

          });

          this.checkedSemester = [...this.semesterArray];
          this.checkedSession = [...this.sessionArray];

        });
      }
    })

    

  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    changeSemester(event,semester) {
      if(!this.checkedSemester.includes(semester)) {
        this.checkedSemester.push(semester)
      } else {
        this.checkedSemester.splice(this.checkedSemester.indexOf(semester), 1);
      }
      console.log(this.checkedSemester);
    },

    changeSession(event,session) {
      if(!this.checkedSession.includes(session)) {
        this.checkedSession.push(session)
      } else {
        this.checkedSession.splice(this.checkedSession.indexOf(session), 1);
      }
      console.log(this.checkedSession);
    },

    download(url) {
      window.open(url, '_blank');
    }
  },
   computed:{
    filterSession:function(){
      return this.filterList.filter(student=>{
        return student.session.match(this.selected);
      })
    }

  },

    
  setup() {
    const users = useLoadProject();
    const name = ref("");
    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });

    const Logout = () => {
      if (confirm("Are you sure?")) {
        firebase
          .auth()
          .signOut()
          .then(() => console.log("Signed out"))
          .catch((err) => alert(err.message));
      }
    };

    return {
      name,
      Logout,
      users,
      deleteUser,
    };
  },
};
</script>

<style></style>
