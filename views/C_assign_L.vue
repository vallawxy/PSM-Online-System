<template>
  <div class="card card-body mt-4">
    <h3>Assign Domain</h3>
    <br>
 <center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Name</th>
              <td>
                <input v-model="form.name" class="form-control" disabled />
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Email</th>
              <td>
                <input v-model="form.email" type="email" class="form-control" disabled />
              </td>
            </tr>
            
            <tr>
              <th style="width: 320px;">Department</th>
              <td>
                <input
                  v-model="form.department"
                  
                  class="form-control"
                  disabled
                />
              </td>
            </tr>
             
        <tr>
              <th style="width: 320px;">Domain</th>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="form.domain"
                  required
                >
                  <option disabled value="">Please select</option>
                  <option>System Development</option>
                  <option>Research Based</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/C_assign" class="btn btn-danger m-1"
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
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUser, updateUser } from "@/firebase";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = computed(() => route.params.id);
    const form = reactive({ name: "", email: "", department: "", domain: "" });
    onMounted(async () => {
      const user = await getUser(userId.value);
      console.log(user, userId.value);
      form.name = user.name;
      form.email = user.email;
      form.department = user.department;
      form.domain = user.domain;
    });
    const update = async () => {
      await updateUser(userId.value, { ...form });
      router.push("/C_assign");
      form.name = "";
      form.email = "";
      form.department = "";
      form.domain = "";
    };
    return { form, update };
  },
};
</script>