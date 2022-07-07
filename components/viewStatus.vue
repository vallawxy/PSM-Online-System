<template>
  <div class="card card-body mt-4">
    <!-- <h5>Evaluator 1</h5> -->
    <center>
      <form>
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th  style="width: 320px;">Project Title</th>
              <td >
                {{ currentProject.title }}
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Project Type</th>
              <td class="form-control">
                <!-- <input v-model="form.project" class="form-control" disabled /> -->
                {{ currentProject.project }}
              </td>
            </tr>
            <tr>
              <th style="height: 43px;">Proposal</th>
              <td>
                <div>
                  <h2 class="accordion-header" id="headingTwo" align="center">
                    <h2
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Proposal Details
                    </h2>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse "
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <form-row>
                        <h6 class="font-weight-bold">Project Abstract</h6>

                        <div class="card card-body mt-6">
                          <p>
                            {{ currentProject.abstract }}
                          </p>
                        </div>
                        <br />

                        <h6 class="font-weight-bold">Project Scope</h6>
                        <div class="card card-body mt-6">
                          <p>
                            {{ currentProject.scope }}
                          </p>
                        </div>
                        <br />

                        <h6 class="font-weight-bold">Project Methodology</h6>
                        <div class="card card-body mt-6">
                          <p>
                            {{ currentProject.methodology }}
                          </p>
                        </div>
                      </form-row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <!-- <tr>
              <th style="height: 50px;">Proposal File</th>
              <td >
                 <button class="btn btn-success " @click="download(currentProject.url)">
                      Download File
                    </button>

              </td>
            </tr> -->

            <tr>
              <th style="width: 320px;">Proposal Status</th>
              <td class="form-control">
                {{ currentProject.evaluationStatus }}
              </td>
            </tr>

            <tr>
              <th style="height: 43px;">Supervisor</th>
              <td>
                <div>
                  <h2 class="accordion-header" id="headingTwo" align="center">
                    <h2
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Comments
                    </h2>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse "
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <form-row>
                        <h6 class="font-weight-bold"></h6>
                        <div class="card card-body mt-6">
                          <p>
                            {{ currentProject.supervisorComment }}
                          </p>
                        </div>
                      </form-row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th style="height: 43px;">Evaluator 1</th>
              <td>
                <div>
                  <h2 class="accordion-header" id="headingTwo" align="center">
                    <h2
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Comments
                    </h2>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse "
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <form-row>
                        <h6 class="font-weight-bold"></h6>
                        <div class="card card-body mt-6">
                          <p>
                            {{ currentProject.evaluationComment1 }}
                          </p>
                        </div>
                      </form-row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th style="height: 43px;">Evaluator 2</th>
              <td>
                <div>
                  <h2 class="accordion-header" id="headingTwo" align="center">
                    <h2
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Comments
                    </h2>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse "
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <form-row>
                        <h6 class="font-weight-bold"></h6>
                        <div class="card card-body mt-6">
                          <p>
                            {{ currentProject.evaluationComment2 }}
                          </p>
                        </div>
                      </form-row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
    <br />
  </div>
</template>

<script>


import { db } from "@/firebase";
import firebase from "firebase";
export default {
  data: () => ({
    currentProject: {},
  }),

methods:{
  // download(url) {
  //     window.open(url, '_blank');
  //   }
},

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("project")
          .where("studentId", "==", user.uid)
          .onSnapshot((snapshotChange) => {
            snapshotChange.forEach((doc) => {
              this.currentProject = {
                key: doc.id,
                ...doc.data(),
              };
            });
          });
      }
    });
  },
};
</script>
