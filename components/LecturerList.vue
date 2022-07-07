<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Department</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, email, department } in users" :key="id">
          <td width="35%">{{ name }}</td>
          <td width="35%">{{ email }}</td>
          <td width="35%">{{ department }}</td>
          <td width="30%">
            <div class="w-100 btn-group" role="group">
              <router-link :to="`/lecturerEdit/${id}`">
                <button class="btn btn-primary mx-1">
                  Edit
                </button>
              </router-link>
              <button class="btn btn-danger mx-1" @click="deleteUser(id)">
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
import { useLoadUsers, deleteUser } from "@/firebase";

export default {
  setup() {
    const users = useLoadUsers();
    return { users, deleteUser };
  },
};
</script>
