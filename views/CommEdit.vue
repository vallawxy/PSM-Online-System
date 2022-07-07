<template>
 <div class="card card-body mt-4">
    <h3>Update Committee</h3>
    <br>
<center>
      <form @submit.prevent="update">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Lecturer Email</th>
              <td>
                <select 
            class="form-select"
            aria-label="Default select example"
            v-model="form.email"
            required
          >
    
            <option v-for="{ id, email } in users" :key="id">{{ email }}</option>
          </select>
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Academic Program </th>
              <td>
                <select
            class="form-select"
            aria-label="Default select example"
            v-model="form.program"
            required
          >
            <option v-for="{ id, name } in AP" :key="id">{{ name }}</option>
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
            <input type="submit" class="btn btn-primary m-1" value="Update" />
          </div>
        </div>
      </form>
    </center>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCm, updateCm } from "@/firebase";
import { useLoadUsers } from "@/firebase";
import { useLoadAP } from "@/firebase";
export default {
  setup() {
    const AP = useLoadAP();
    const users = useLoadUsers();
    const router = useRouter();
    const route = useRoute();
    const userId = computed(() => route.params.id);
    const form = reactive({ email: "", program: "" });
    onMounted(async () => {
      const Cm = await getCm(userId.value);
      console.log(Cm, userId.value);
      form.email = Cm.email;
      form.program = Cm.program;
    });
    const update = async () => {
      await updateCm(userId.value, { ...form });
      router.push("/manageC");
      form.email = "";
      form.program = "";
    };
    return { users, AP, form, update };
  },
};
</script>
