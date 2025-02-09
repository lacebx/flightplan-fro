<template>
  <div class="profile">
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-info">
          <div class="profile-avatar">
            <span class="avatar-placeholder">JD</span>
          </div>
          <div class="profile-text">
            <h2>John Doe</h2>
            <p>Computer Science Major</p>
            <p>Class of 2024</p>
          </div>
        </div>
        <div class="profile-stats">
          <div class="stat-item">
            <h3>850</h3>
            <p>Total Points</p>
          </div>
          <div class="stat-item">
            <h3>12</h3>
            <p>Events Attended</p>
          </div>
          <div class="stat-item">
            <h3>8</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
      </div>

      <div class="profile-sections">
        <div class="section">
          <div class="section-header">
            <h3>Personal Information</h3>
            <button class="edit-btn">Edit</button>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <label>Email</label>
              <p>john.doe@oc.edu</p>
            </div>
            <div class="info-item">
              <label>Phone</label>
              <p>(555) 123-4567</p>
            </div>
            <div class="info-item">
              <label>Major</label>
              <p>Computer Science</p>
            </div>
            <div class="info-item">
              <label>Expected Graduation</label>
              <p>May 2024</p>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h3>Career Interests</h3>
            <button class="edit-btn">Edit</button>
          </div>
          <div class="tags-container">
            <span class="interest-tag">Software Development</span>
            <span class="interest-tag">Web Design</span>
            <span class="interest-tag">AI/ML</span>
            <span class="interest-tag">Cloud Computing</span>
          </div>
        </div>
      </div>

      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  methods: {
    logout() {
      this.$emit('logout'); // Emit logout event
      this.$router.push('/'); // Redirect to login view
    },
  },
};
</script>

<style scoped>
.profile {
  padding: 20px;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #41b883;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  color: white;
  font-size: 2em;
  font-weight: bold;
}

.profile-text h2 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.profile-text p {
  margin: 0;
  color: #666;
}

.profile-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  margin: 0;
  color: #41b883;
  font-size: 1.8em;
}

.stat-item p {
  margin: 5px 0 0 0;
  color: #666;
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section {
  background-color: #f5f5f5;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  color: #2c3e50;
}

.edit-btn {
  background-color: transparent;
  border: 1px solid #41b883;
  color: #41b883;
  padding: 5px 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background-color: #41b883;
  color: white;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.info-item label {
  display: block;
  color: #666;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.info-item p {
  margin: 0;
  color: #2c3e50;
  font-weight: 500;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interest-tag {
  background-color: #e8f5e9;
  color: #41b883;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.9em;
}

.logout-btn {
  background-color: #e74c3c; /* Red color for logout */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b; /* Darker red on hover */
}
</style>