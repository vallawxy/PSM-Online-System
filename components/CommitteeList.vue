<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Lecturer Email</th>
          <th scope="col">Academic Program</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, email, program } in users" :key="id">
          <td width="50%">{{ email }}</td>
          <td width="50%">{{ program }}</td>
          <td width="50%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/CommEdit/${id}`">
                <button class="btn btn-primary mx-1">
                  Edit
                </button>
              </router-link>
              <button class="btn btn-danger mx-1" @click="deleteCm(id)">
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
import { useLoadCm, deleteCm } from "@/firebase";

export default {

  setup() {

    const users = useLoadCm();
    return { users, deleteCm };
  },

};
</script>
