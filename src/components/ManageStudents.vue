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
        student.name.toLowerCase().includes(query)
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