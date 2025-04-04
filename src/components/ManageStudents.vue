<template>
  <div class="manage-students">
    <h1>Manage Students</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.role }}</td>
          <td>
            <button @click="makeAdmin(student.id)">Make Admin</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [], // Fetch this from the backend
    };
  },
  methods: {
    fetchStudents() {
      // Fetch students from the backend
    },
    makeAdmin(studentId) {
      // Logic to make a student an admin
      console.log(`Making student with ID: ${studentId} an admin`); // Example usage
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.manage-students {
  /* Add styles for managing students */
}
</style> 