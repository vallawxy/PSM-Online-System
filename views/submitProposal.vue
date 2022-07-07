<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar" :class="{ active: isActive }" @click.prevent="toggle">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" class="btn btn-primary">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <h1><a  class="logo">PSM1</a></h1>
      <ul class="list-unstyled components mb-5">
         <li>
          <router-link to="/studentDashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/studentProfile">Profile</router-link>
        </li>
        <li>
          <router-link to="/SupervisorSelect">Supervisor</router-link>
        </li>
        <li class="active">
          <router-link to="/submitProposal">Proposal</router-link>
        </li>
        <li>
          <router-link to="" @click="Logout">Logout</router-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="p-4 p-md-5 pt-5">
      <div class="adminHome">
        <!-- <h1 align="right"> Welcome, {{ name }}</h1> -->
        <h1>Submit Proposal</h1>
        <div align="right ">
          <!-- <router-link to="/lecturerCreate" class="btn btn-success " 
            >Submit</router-link
          > -->
        </div>
      </div>

  <div class="card card-body mt-4">
    <!-- <h3>Student Register</h3>
    <br /> -->
    <center>
      <form @submit.prevent="onSubmit">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Project Title</th>
              <td>
                <input v-model="proposal.title" class="form-control" required />
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Project Type</th>
              <td>
                
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="proposal.project"
                  required
                >
                  <option disabled value="">Please select</option>
                  <option>System Development</option>
                  <option>Research Based</option>
                </select>
              </td>
            </tr>

            <tr>
              <th style="height:43px">Online Proposal Form</th>
              <td>
                <div class="accordion-item" align="center">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Fill Online Proposal Form
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                  
                      <form-row>
                        <label for="exampleFormControlTextarea1"
                          >Project Abstract</label
                        >
                        <textarea
                          v-model="proposal.abstract"
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>

                        <label for="exampleFormControlTextarea1"
                          >Project Scope</label
                        >
                        <textarea
                          v-model="proposal.scope"
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>

                        <label for="exampleFormControlTextarea1"
                          >Project Methodology</label
                        >
                        <textarea
                          v-model="proposal.methodology"
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </form-row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th style="height:43px">Download Proposal Form</th>
              <td>
                <a
                  style="width: 320px"
                  href="https://firebasestorage.googleapis.com/v0/b/project-69cc1.appspot.com/o/Proposal%20Form.pdf?alt=media&token=57b9278e-9fa4-4037-bec6-8b9492593763"
                  target="_blank">
                  Proposal Form Download</a
                >
              </td>
            </tr>

            <tr>
              <th style="height:100px">Upload Proposal Form</th>
              <td>
                <input
                  type="file"
                  @change="previewImage"
                  accept="application/pdf,application/vnd.ms-excel/*"
                />
                <!-- <input 
                  type="file"
                  @change="previewPdf"
                  accept="application/pdf,application/vnd.ms-excel/*"
                /> -->

                <div>
                  Progress: {{ uploadValue.toFixed() + "%" }}
                  <progress
                    id="progress"
                    :value="uploadValue"
                    max="100"
                  ></progress>
                </div>
                <div v-if="imageData != null">
                  <a href="" class="preview" :src="picture"></a>
                  <br />
                  <!-- <button @click="onUpload">Upload</button> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <br>
          <div align="right" class="w3-bar">
            <!-- <router-link to="/studentProfile" class="btn btn-danger m-1"
              >Back</router-link
            > -->
            <button type="submit" class="btn btn-primary m-1" v-if="canSubmit && !projectExist">
              Submit
            </button>
            <button class="btn btn-info m-1" v-if="!canSubmit" disabled>
              Submit
            </button>
            <button class="btn btn-primary m-1" v-if="canSubmit && projectExist" @click="editProposal">Edit</button>
          </div>
        </div>
      </form>
    </center>
  </div>
 
    </div>
  </div>
</template>

<script>

import { db } from "@/firebase";
import firebase from "firebase";
import { ref, onBeforeMount } from "vue";
export default {
  name: "Upload",
   data1: () => ({
    isActive: false,
  }),
  data() {
    
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      proposal: {},
      currentSupervisor: [],
      canSubmit: true,
      currentProject: {},
      projectExist: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        db.collection('student-supervisor').where('studentId','==',user.uid).where('status','==','approved').onSnapshot((snapshotChange) => {
          this.currentSupervisor = [];
          snapshotChange.forEach((doc) => {
            this.currentSupervisor.push({
              key: doc.id,
              ...doc.data(),
            });
          });
        })

        db.collection('project').where('studentId','==',user.uid).onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
            console.log(doc.data())
            this.projectExist = true;
            this.currentProject = {
              key: doc.id,
              ...doc.data()
            }
            this.proposal = {...this.currentProject}
            if(doc.data().evaluationStatus == 'pending' || doc.data().evaluationStatus == 'accepted' ) {
              this.canSubmit = false;
            }
          });
        })
      }
    })
    
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      return new Promise((resolve) => {
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture = url;
              resolve(true);
            });
          }
        );
      })
    },

    toggle() {
      this.isActive = !this.isActive;
    },

    onSubmit() {
      if(!this.projectExist) {

        console.log(this.imageData);

        if(this.imageData) {
          this.onUpload().then(() => {
            console.log(this.currentSupervisor[0]);

            if(this.proposal.abstract && this.proposal.scope && this.proposal.methodology) {
              db.collection('project').add({
                title: this.proposal.title,
                project: this.proposal.project,
                abstract: this.proposal.abstract,
                scope: this.proposal.scope,
                methodology: this.proposal.methodology,
                url: this.picture,
                studentId: this.currentSupervisor[0].studentId,
                supervisorId: this.currentSupervisor[0].supervisorId,
                student: this.currentSupervisor[0].student,
                supervisor: this.currentSupervisor[0].supervisor,
                evaluationStatus: 'pending'
              }).then(() => {
                alert('Proposal submitted.')
              })

            } else {
              db.collection('project').add({
                title: this.proposal.title,
                project: this.proposal.project,
                url: this.picture,
                studentId: this.currentSupervisor[0].studentId,
                supervisorId: this.currentSupervisor[0].supervisorId,
                student: this.currentSupervisor[0].student,
                supervisor: this.currentSupervisor[0].supervisor,
                evaluationStatus: 'pending'
              }).then(() => {
                alert('Proposal submitted.')
              })
            }
          })
        } else {
          db.collection('project').add({
              title: this.proposal.title,
              project: this.proposal.project,
              abstract: this.proposal.abstract,
              scope: this.proposal.scope,
              methodology: this.proposal.methodology,
              studentId: this.currentSupervisor[0].studentId,
              supervisorId: this.currentSupervisor[0].supervisorId,
              student: this.currentSupervisor[0].student,
              supervisor: this.currentSupervisor[0].supervisor,
              evaluationStatus: 'pending'
            }).then(() => {
              alert('Proposal submitted.')
            })
        }
        




      }
    },

    editProposal() {
      if(this.imageData) {
        this.onUpload().then(() => {
          if(this.proposal.abstract && this.proposal.scope && this.proposal.methodology) {
            db.collection('project').doc(this.currentProject.key).update({
              title: this.proposal.title,
              project: this.proposal.project,
              abstract: this.proposal.abstract,
              scope: this.proposal.scope,
              methodology: this.proposal.methodology,
              url: this.picture,
              evaluationStatus: 'pending'
            }).then(() => {
              alert('Proposal edited.')
            })
          } else {
            db.collection('project').doc(this.currentProject.key).update({
              title: this.proposal.title,
              project: this.proposal.project,
              url: this.picture,
              evaluationStatus: 'pending'
            }).then(() => {
              alert('Proposal edited.')
            })
          }
          
        })
      } else {
        db.collection('project').doc(this.currentProject.key).update({
          title: this.proposal.title,
          project: this.proposal.project,
          abstract: this.proposal.abstract,
          scope: this.proposal.scope,
          methodology: this.proposal.methodology,
          evaluationStatus: 'pending'
        }).then(() => {
          alert('Proposal edited.')
        })
      }
    }
  },
  setup() {
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

    return { name, Logout };
  },
};
</script>

<style></style>
