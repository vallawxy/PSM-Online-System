<template>
  <div class="card card-body mt-4">
    <h3>Create Academic Programs</h3>
    <br />
    <div align="center">
      <form @submit.prevent="onSubmit">
        <table
          class="w3-table w3-center table-hover table-bordered "
          style="width: 640px;"
        >
          <tbody class="text-center">
            <tr>
              <th style="width: 320px;">Name</th>
              <td>
                <input v-model="user.name" class="form-control" required />
              </td>
            </tr>
            <tr>
              <th style="width: 320px;">Program Code</th>
              <td>
                <input v-model="user.code" class="form-control" required />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w3-show-inline-block">
          <div align="right" class="w3-bar">
            <router-link to="/ap" class="btn btn-danger m-1">Back</router-link>
            <input type="submit" class="btn btn-primary m-1" value="Create" />
          </div>
        </div>
      </form>
  </div>
  </div>
</template>

<script>
import { createAP } from "@/firebase";
import { useRouter } from "vue-router";
import { reactive } from "vue";

export default {
  setup() {
    const router = useRouter();
    const user = reactive({ name: "", code: "" });
    const onSubmit = async () => {
      await createAP({ ...user });

      user.name = "";
      user.code = "";
      router.push("/ap");
    };
    return { user, onSubmit };
  },
};
</script>

<style></style>
