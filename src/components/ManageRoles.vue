<template>
  <div class="manage-roles">
    <h1>Manage Roles</h1>
    <input type="text" v-model="searchQuery" placeholder="Search by name or email" @input="filterStudents" />
    <ul>
      <li v-for="student in filteredStudents" :key="student.id" @click="selectStudent(student)">
        {{ student.name }} ({{ student.email }})
      </li>
    </ul>
    <div v-if="selectedStudent" class="role-details">
      <h2>Change Role for {{ selectedStudent.name }}</h2>
      <p><strong>Email:</strong> {{ selectedStudent.email }}</p>
      <p><strong>Current Role:</strong> {{ selectedStudent.role }}</p>
      <select v-model="selectedRole" @change="updateRole">
        <option value="admin">Admin</option>
        <option value="student">Student</option>
        <option value="student_staff">Student Staff</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      searchQuery: '',
      filteredStudents: [],
      selectedStudent: null,
      selectedRole: '',
    };
  },
  methods: {
    fetchStudents() {
      axios
        .get('http://localhost:8082/api/students', { withCredentials: true })
        .then((response) => {
          this.students = response.data;
          this.filteredStudents = this.students;
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    },
    filterStudents() {
      const query = this.searchQuery.toLowerCase();
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)
      );
    },
    selectStudent(student) {
      this.selectedStudent = student;
      this.selectedRole = student.role; // Set the current role
    },
    updateRole() {
      axios
        .put(`http://localhost:8082/api/students/${this.selectedStudent.id}/role`, { role: this.selectedRole }, { withCredentials: true })
        .then(() => {
          alert(`Role updated to ${this.selectedRole}`);
        })
        .catch((error) => {
          console.error('Error updating role:', error);
        });
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.manage-roles {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.manage-roles input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

.manage-roles ul {
  list-style: none;
  padding: 0;
}

.manage-roles li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.manage-roles li:hover {
  background-color: #f0f0f0;
}

.role-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}
</style>