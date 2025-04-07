<template>
  <div class="manage-students">
    <h1>Manage Students</h1>
    <input type="text" v-model="searchQuery" placeholder="Search by name or student number" @input="filterStudents" />
    <ul>
      <li v-for="student in filteredStudents" :key="student.id" @click="selectStudent(student)">
        {{ student.name }} ({{ student.studentNumber }})
      </li>
    </ul>
    <div v-if="selectedStudent" class="student-details">
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {{ selectedStudent.name }}</p>
      <p><strong>Student ID:</strong> {{ selectedStudent.studentNumber }}</p>
      <p><strong>Major:</strong> {{ selectedStudent.major }}</p>
      <p><strong>Expected Graduation:</strong> {{ selectedStudent.expectedGraduation }}</p>
      <p><strong>Points:</strong> {{ selectedStudent.points }}</p>
      <h3>Experiences</h3>
      <ul>
        <li v-for="experience in selectedStudent.experiences" :key="experience.id">
          {{ experience.name }} - {{ experience.description }}
        </li>
      </ul>
      <h3>Tasks</h3>
      <ul>
        <li v-for="task in selectedStudent.tasks" :key="task.id">
          {{ task.name }} - {{ task.status }}
        </li>
      </ul>
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
        student.name.toLowerCase().includes(query) || student.studentNumber.toString().includes(query)
      );
    },
    selectStudent(student) {
      axios
        .get(`http://localhost:8082/api/students/${student.id}`, { withCredentials: true })
        .then((response) => {
          this.selectedStudent = response.data;
        })
        .catch((error) => {
          console.error('Error fetching student details:', error);
        });
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.manage-students {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.manage-students input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

.manage-students ul {
  list-style: none;
  padding: 0;
}

.manage-students li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.manage-students li:hover {
  background-color: #f0f0f0;
}

.student-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style> 