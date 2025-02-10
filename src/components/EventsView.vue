<template>
  <div class="events">
    <div class="events-container">
      <div class="events-header">
        <h2>Upcoming Events</h2>
        <div class="filter-buttons">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">Workshops</button>
          <button class="filter-btn">Career Fairs</button>
        </div>
      </div>

      <div class="events-list">
        <div class="event-item" v-for="event in events" :key="event.id">
          <div class="event-content">
            <h3>{{ event.name }}</h3>
            <p class="event-description">{{ event.description }}</p>
            <div class="event-details">
              <span class="detail-item">
                <i class="fas fa-calendar"></i> {{ event.date }}
              </span>
              <span class="detail-item">
                <i class="fas fa-clock"></i> {{ event.time }}
              </span>
              <span class="detail-item">
                <i class="fas fa-map-marker-alt"></i> {{ event.location }}
              </span>
            </div>
          </div>
          <div class="event-reward">
            <h4>Reward</h4>
            <p>{{ event.points }} Points</p>
            <button class="register-btn">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsView',
  data() {
    return {
      events: [
        {
          id: 1,
          name: 'Resume Writing Workshop',
          description: 'Learn how to create a professional resume that stands out to employers.',
          date: 'April 15, 2024',
          time: '2:00 PM',
          location: 'Career Center',
          points: 50
        },
        {
          id: 2,
          name: 'Spring Career Fair',
          description: 'Meet with representatives from top companies across various industries.',
          date: 'April 20, 2024',
          time: '10:00 AM',
          location: 'Student Center',
          points: 100
        },
        {
          id: 3,
          name: 'Interview Skills Workshop',
          description: 'Practice common interview questions and receive feedback from professionals.',
          date: 'April 25, 2024',
          time: '3:30 PM',
          location: 'Online',
          points: 75
        },
        {
          id: 4,
          name: 'Networking Event',
          description: 'Connect with alumni and industry professionals in your field.',
          date: 'May 1, 2024',
          time: '5:00 PM',
          location: 'Alumni Center',
          points: 80
        }
      ]
    };
  }
};
</script>

<style scoped>
.events {
  padding: 20px;
}

.events-container {
  max-width: 1200px;
  margin: 0 auto;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #41b883;
  background-color: white;
  color: #41b883;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover, .filter-btn.active {
  background-color: #41b883;
  color: white;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.event-item {
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.event-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.event-content {
  flex: 1;
}

.event-content h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.event-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
}

.event-details {
  display: flex;
  gap: 20px;
}

.detail-item {
  color: #666;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 5px;
}

.event-reward {
  min-width: 150px;
  text-align: center;
  border-left: 1px solid #ddd;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.event-reward h4 {
  margin: 0 0 5px 0;
  color: #41b883;
}

.event-reward p {
  margin: 0 0 15px 0;
  font-weight: bold;
  color: #2c3e50;
}

.register-btn {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.register-btn:hover {
  background-color: #3aa876;
}
</style>