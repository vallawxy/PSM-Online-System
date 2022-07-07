<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Code</th>
          <th scope="col"></th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, code } in AP" :key="id">
          <td width="30%">{{ name }}</td>
          <td width="30%">{{ code }}</td>
           <td width="10%"></td>
          <td width="5%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/APEdit/${id}`">
                <button class="btn btn-primary mx-1">
                  Edit
                </button>
              </router-link>
              <button class="btn btn-danger mx-1" @click="deleteAP(id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadAP, deleteAP } from "@/firebase";
export default {
  setup() {
    const AP = useLoadAP();
    return { AP, deleteAP };
  },
};
</script>
