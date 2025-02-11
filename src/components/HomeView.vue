<template>
  <div class="home">
    <h1>Welcome, {{ $auth.user?.username }}</h1>
    <div class="grid-container">
      <div class="box green">
        <span class="icon">A</span>
        <h3>Achievements</h3>
        <p>Current Progress: 75%</p>
      </div>
      <div class="box red">
        <h3>Upcoming Tasks</h3>
        <p>Resume Workshop - Due Tomorrow</p>
        <p>Mock Interview - Next Week</p>
      </div>
      <div class="box blue">
        <h3>Quick Links</h3>
        <ul>
          <li>Career Resources</li>
          <li>Job Board</li>
          <li>Schedule Appointment</li>
          <li>Resume Templates</li>
        </ul>
      </div>
      <div class="box orange">
        <h3>Recent Activity</h3>
        <p>Completed: LinkedIn Profile Update</p>
        <p>Next: Career Fair Preparation</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 20px;
  margin: 20px;
}

.box {
  border-radius: 5px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
}

.box h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.box p {
  margin: 5px 0;
}

.box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.box ul li {
  margin: 10px 0;
  cursor: pointer;
}

.green {
  background-color: #32cd32;
  grid-column: span 1;
}

.red {
  background-color: #b22222;
  grid-column: span 1;
}

.blue {
  background-color: #0000cd;
  grid-row: span 2;
}

.orange {
  background-color: #ff8c00;
  grid-column: span 2;
}

.icon {
  background-color: white;
  color: #1e90ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
}

/* Hover effects */
.box:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.box ul li:hover {
  text-decoration: underline;
}
</style> 