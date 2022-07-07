<template>
 <div id="content" class="p-4 p-md-5 pt-5">
      <div >
        <!-- <h1 align="right"> Welcome, {{ name }}</h1> -->
        <h1>Proposal</h1>
      </div>

  <div class="card card-body mt-4">


    <br>
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
                <input v-model="form.evaluationStatus" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
<br>

<h5>Supervisor</h5>
    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Comments</th>
              <td >
                <input v-model="form.supervisorComment" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
    <br />

    <h5>Evaluator 1</h5>
    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Comments</th>
              <td >
                <input v-model="form.evaluationComment1" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
    <br />

    <h5>Evaluator 2</h5>
    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">

            <tr>
              <th style="width: 320px;">Comments</th>
              <td>
                <input v-model="form.evaluationComment2" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/SuperviseStudent" class="btn btn-danger m-1"
              >Back</router-link
            >
          </div>
        </div>
      </form>
    </center>
  </div>
 </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProject, updateProject } from "@/firebase";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = computed(() => route.params.id);
    const form = reactive({
      evaluationStatus: "",
      evaluationComment1: "",
      evaluationComment2: "",
      supervisorComment: "",

    });
    onMounted(async () => {
      const user = await getProject(userId.value);
      console.log(user, userId.value);
      form.evaluationStatus = user.evaluationStatus;
      form.evaluationComment1 = user.evaluationComment1;
      form.evaluationComment2 = user.evaluationComment2;
      form.supervisorComment = user.supervisorComment;
    });
    const update = async () => {
      await updateProject(userId.value, { ...form });
      router.push("/SuperviseStudent");
      form.evaluationStatus = "";
      form.evaluationComment1 = "";
      form.evaluationComment2 = "";
      form.supervisorComment = "";
    };
    return { form, update };
  },
};
</script>
