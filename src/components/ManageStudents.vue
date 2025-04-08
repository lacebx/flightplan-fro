<template>
  <div class="manage-students">
    <div class="admin-nav">
      <ul>
        <li><router-link to="/admin/manage-students" class="nav-btn">Manage Students</router-link></li>
        <li><router-link to="/admin/manage-events" class="nav-btn">Manage Events</router-link></li>
        <li><router-link to="/admin/view-student-plans" class="nav-btn">View Plans</router-link></li>
        <li><button @click="logout" class="logout-btn">Logout</button></li>
      </ul>
    </div>
    
    <h1>Manage Students</h1>
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search by name or ID number" 
        @input="filterStudents" 
        class="search-input"
      />
      <button @click="fetchStudents" class="refresh-btn">Refresh List</button>
    </div>
    
    <div v-if="loading" class="loading">
      Loading students...
    </div>
    
    <div v-else-if="filteredStudents.length === 0" class="no-results">
      <p>No students found. Try adjusting your search or refreshing the list.</p>
    </div>
    
    <div class="content-container">
      <div class="students-list">
        <div 
          v-for="student in filteredStudents" 
          :key="student.id" 
          @click="selectStudent(student)"
          class="student-item"
          :class="{ 'selected': selectedStudent && selectedStudent.id === student.id }"
        >
          <div class="student-info">
            <span class="student-name">{{ student.firstName }} {{ student.lastName }}</span>
            <span class="student-id">ID: {{ student.idNumber }}</span>
          </div>
          <div class="student-points">
            <span class="points-badge">{{ student.points || 0 }} pts</span>
          </div>
        </div>
      </div>
      
      <div v-if="selectedStudent" class="student-details">
        <h2>Student Details</h2>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">First Name:</span>
            <span class="detail-value">{{ selectedStudent.firstName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Name:</span>
            <span class="detail-value">{{ selectedStudent.lastName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">ID Number:</span>
            <span class="detail-value">{{ selectedStudent.idNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Major:</span>
            <span class="detail-value">{{ selectedStudent.major || 'Not specified' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Expected Graduation:</span>
            <span class="detail-value">{{ selectedStudent.expectedGraduation || 'Not specified' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Points:</span>
            <span class="detail-value">{{ selectedStudent.points || 0 }}</span>
          </div>
        </div>
        
        <div class="notification-section">
          <h3>Send Notification</h3>
          <div class="notification-form">
            <input 
              v-model="notificationMessage" 
              placeholder="Enter your message" 
              class="notification-input"
            />
            <button @click="sendNotification" class="send-btn">Send</button>
          </div>
        </div>
        
        <div v-if="selectedStudent.experiences && selectedStudent.experiences.length > 0" class="section">
          <h3>Experiences</h3>
          <ul class="list">
            <li v-for="experience in selectedStudent.experiences" :key="experience.id" class="list-item">
              <span class="item-name">{{ experience.name }}</span>
              <span class="item-description">{{ experience.description }}</span>
            </li>
          </ul>
        </div>
        
        <div v-if="selectedStudent.tasks && selectedStudent.tasks.length > 0" class="section">
          <h3>Tasks</h3>
          <ul class="list">
            <li v-for="task in selectedStudent.tasks" :key="task.id" class="list-item">
              <span class="item-name">{{ task.name }}</span>
              <span class="item-status" :class="task.status">{{ task.status }}</span>
            </li>
          </ul>
        </div>
        
        <div v-if="selectedStudent.events && selectedStudent.events.length > 0" class="section">
          <h3>Events</h3>
          <ul class="list">
            <li v-for="event in selectedStudent.events" :key="event.id" class="list-item">
              <span class="item-name">{{ event.name }}</span>
              <span class="item-date">{{ formatDate(event.date) }}</span>
            </li>
          </ul>
        </div>
      </div>
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
      loading: false,
      error: null,
      notificationMessage: ''
    };
  },
  methods: {
    fetchStudents() {
      this.loading = true;
      this.error = null;
      console.log('Fetching students...');
      
      axios
        .get('http://localhost:8082/api/users', { withCredentials: true })
        .then((response) => {
          console.log('Students fetched successfully:', response.data);
          this.students = Array.isArray(response.data) ? response.data : [];
          this.filteredStudents = [...this.students];
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
          console.error('Error details:', error.response?.data);
          this.error = error.response?.data?.message || 'Failed to fetch students';
          this.loading = false;
          alert(`Error fetching students: ${error.response?.data?.message || error.message}`);
        });
    },
    filterStudents() {
      if (!this.searchQuery.trim()) {
        this.filteredStudents = [...this.students];
        return;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredStudents = this.students.filter(student => {
        const firstNameMatch = student.firstName && student.firstName.toLowerCase().includes(query);
        const lastNameMatch = student.lastName && student.lastName.toLowerCase().includes(query);
        const idMatch = student.idNumber && student.idNumber.toString().includes(query);
        return firstNameMatch || lastNameMatch || idMatch;
      });
      
      console.log(`Filtered ${this.filteredStudents.length} students matching "${query}"`);
    },
    selectStudent(student) {
      this.loading = true;
      console.log('Fetching details for student:', student.id);
      
      this.selectedStudent = student;
      this.loading = false;
      
      // Uncomment this code when the backend endpoint is available
      /*
      axios
        .get(`http://localhost:8082/api/users/${student.id}`, { withCredentials: true })
        .then((response) => {
          console.log('Student details fetched successfully:', response.data);
          this.selectedStudent = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching student details:', error);
          console.error('Error details:', error.response?.data);
          this.error = error.response?.data?.message || 'Failed to fetch student details';
          this.loading = false;
          alert(`Error fetching student details: ${error.response?.data?.message || error.message}`);
        });
      */
    },
    sendNotification() {
      if (!this.notificationMessage.trim()) {
        alert('Please enter a message');
        return;
      }
      
      if (!this.selectedStudent) {
        alert('Please select a student first');
        return;
      }
      
      // For now, just show a success message since the backend endpoint might not be available
      alert(`Notification would be sent to ${this.selectedStudent.firstName} ${this.selectedStudent.lastName}: "${this.notificationMessage}"`);
      this.notificationMessage = '';
      
      // Uncomment this code when the backend endpoint is available
      /*
      this.loading = true;
      console.log('Sending notification to student:', this.selectedStudent.id);
      
      axios
        .post(`http://localhost:8082/api/notifications`, {
          userId: this.selectedStudent.id,
          message: this.notificationMessage
        }, { withCredentials: true })
        .then((response) => {
          console.log('Notification sent successfully:', response.data);
          alert('Notification sent successfully');
          this.notificationMessage = '';
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
          console.error('Error details:', error.response?.data);
          this.error = error.response?.data?.message || 'Failed to send notification';
          this.loading = false;
          alert(`Error sending notification: ${error.response?.data?.message || error.message}`);
        });
      */
    },
    formatDate(dateString) {
      if (!dateString) return 'No date';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    logout() {
      // Clear user data from localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      
      // Redirect to login page
      this.$router.push('/admin-login');
    }
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>
<style scoped>
.manage-students {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  color: white;
}

.admin-nav {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.admin-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
}

.admin-nav li {
  margin: 0;
}

.admin-nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.admin-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.admin-nav a.router-link-active {
  background-color: rgba(65, 184, 131, 0.3);
  border-left: 4px solid #41b883;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.content-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.students-list {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.student-details {
  flex: 2;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 20px;
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.refresh-btn {
  padding: 10px 15px;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.loading, .no-results {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin: 20px 0;
}

.student-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.student-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.student-item.selected {
  background: rgba(65, 184, 131, 0.3);
  border-left: 4px solid #41b883;
}

.student-info {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.student-id {
  font-size: 0.9rem;
  opacity: 0.8;
}

.points-badge {
  background: #41b883;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.detail-value {
  font-weight: bold;
}

.section {
  margin-top: 20px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  margin-bottom: 5px;
}

.item-name {
  font-weight: bold;
}

.item-description {
  font-size: 0.9rem;
  opacity: 0.8;
}

.item-date {
  font-size: 0.9rem;
  opacity: 0.8;
}

.item-status {
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 0.8rem;
}

.item-status.completed {
  background: #41b883;
  color: white;
}

.item-status.pending {
  background: #f39c12;
  color: white;
}

.item-status.in-progress {
  background: #3498db;
  color: white;
}

.notification-section {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.notification-form {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.notification-input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.send-btn {
  padding: 10px 15px;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style> 