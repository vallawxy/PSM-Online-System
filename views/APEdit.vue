<template>
  <div class="card card-body mt-4">
    <h3>Update Academic Programs</h3>
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
                <input v-model="form.name" class="form-control" required />
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Program Code</th>
              <td>
                <input v-model="form.code" class="form-control" required />
              </td>
            </tr>
           
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/ap" class="btn btn-danger m-1"
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
import { getAP, updateAP } from "@/firebase";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userId = computed(() => route.params.id);
    const form = reactive({ name: "", code: "" });
    onMounted(async () => {
      const AP = await getAP(userId.value);
      console.log(AP, userId.value);
      form.name = AP.name;
      form.code = AP.code;
    });
    const update = async () => {
      await updateAP(userId.value, { ...form });
      router.push("/ap");
      form.name = "";
      form.code = "";
    };
    return { form, update };
  },
};
</script>
