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
              <th style="width: 320px;">Project Title</th>
              <td>
                <textarea v-model="form.title" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
<br>
<center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Project Type</th>
              <td>
                <textarea v-model="form.project" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
<br>

    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Project Status</th>
              <td>
                <textarea v-model="form.abstract" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
<br>

    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Project Scope</th>
              <td >
                 <textarea v-model="form.scope" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
    <br />

    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Project Methodology</th>
              <td >
                 <textarea v-model="form.methodology" class="form-control" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
    <br />

    <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">

            <tr>
              <th style="height: 70px;">Project File</th>
              <td>
                 <button class="btn btn-success " @click="download(form.url)">
                      Download File
                    </button>
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
      abstract: "",
      scope: "",
      methodology: "",
      url: "",
      title: "",
      project: "",
    });
    onMounted(async () => {
      const user = await getProject(userId.value);
      console.log(user, userId.value);
      form.abstract = user.abstract;
      form.scope = user.scope;
      form.methodology = user.methodology;
       form.url = user.url;
       form.title = user.title;
       form.project = user.project;
    });
    const update = async () => {
      await updateProject(userId.value, { ...form });
      router.push("/SuperviseStudent");
      form.abstract = "";
      form.scope = "";
      form.methodology = "";
       form.url = "";
        form.title = "";
         form.project = "";
    };
    return { form, update };
  },

  methods:{
  download(url) {
      window.open(url, '_blank');
    }
},
};
</script>
