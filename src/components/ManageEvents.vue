<template>
  <div class="manage-events">
    <h1>Manage Events</h1>
    <div class="action-buttons">
      <button @click="toggleForm">{{ isFormVisible ? 'Cancel' : 'Add Event' }}</button>
      <button @click="fetchEvents" class="refresh-btn">Refresh Events</button>
    </div>
    <form v-if="isFormVisible" @submit.prevent="isEditing ? updateEvent() : addEvent()">
      <input type="text" v-model="eventName" placeholder="Event Name" required />
      <textarea v-model="eventDescription" placeholder="Description" required></textarea>
      <input type="text" v-model="eventType" placeholder="Type" required />
      <input type="date" v-model="eventDate" required />
      <input type="time" v-model="eventStartTime" required />
      <input type="time" v-model="eventEndTime" required />
      <input type="text" v-model="eventLocation" placeholder="Location" required />
      <input type="text" v-model="eventAttendanceType" placeholder="Attendance Type" required />
      <button type="submit">{{ isEditing ? 'Update Event' : 'Add Event' }}</button>
    </form>
    <div v-if="events.length === 0" class="no-events">
      <p>No events found. Try adding an event or refreshing the list.</p>
    </div>
    <ul v-else>
      <li v-for="event in events" :key="event.eventid" class="event-item">
        <span>{{ event.name }} - {{ event.date }}</span>
        <div class="event-actions">
          <button @click="editEvent(event)">Edit</button>
          <button @click="deleteEvent(event.eventid)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '../eventBus';

export default {
  data() {
    return {
      events: [],
      eventName: '',
      eventDescription: '',
      eventType: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventLocation: '',
      eventAttendanceType: '',
      isEditing: false,
      currentEventId: null,
      isFormVisible: false,
    };
  },
  methods: {
    fetchEvents() {
      console.log('Fetching events...');
      axios
        .get('http://localhost:8082/api/events', { withCredentials: true })
        .then((response) => {
          console.log('Events fetched successfully:', response.data);
          // Check if response.data is an array, if not, try to extract the events array
          if (Array.isArray(response.data)) {
            this.events = response.data;
          } else if (response.data && response.data.events) {
            this.events = response.data.events;
          } else {
            console.warn('Unexpected response format:', response.data);
            this.events = [];
          }
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
          console.error('Error details:', error.response?.data);
          // Display error to user
          alert(`Error fetching events: ${error.response?.data?.message || error.message}`);
        });
    },
    addEvent() {
      // Format the date and time fields properly
      const formattedDate = this.eventDate ? new Date(this.eventDate).toISOString().split('T')[0] : '';
      
      const newEvent = {
        name: this.eventName,
        description: this.eventDescription,
        eventtype: this.eventType,
        date: formattedDate,
        starttime: this.eventStartTime,
        endtime: this.eventEndTime,
        location: this.eventLocation,
        attendancetype: this.eventAttendanceType,
      };
      
      console.log('Sending event data:', newEvent);
      
      axios
        .post('http://localhost:8082/api/events', newEvent, { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Event added successfully:', response.data);
          eventBus.emit('eventAdded', response.data);
          
          // Add the new event to the local array immediately
          if (response.data && response.data.eventid) {
            this.events.push(response.data);
          }
          
          this.resetForm();
          // Fetch events again to ensure we have the latest data
          this.fetchEvents();
        })
        .catch((error) => {
          console.error('Error adding event:', error);
          console.error('Error details:', error.response?.data);
          // Display error message to user
          alert(`Error adding event: ${error.response?.data?.message || error.message}`);
        });
    },
    editEvent(event) {
      this.eventName = event.name;
      this.eventDescription = event.description;
      this.eventType = event.eventtype;
      this.eventDate = event.date;
      this.eventStartTime = event.starttime;
      this.eventEndTime = event.endtime;
      this.eventLocation = event.location;
      this.eventAttendanceType = event.attendancetype;
      this.isEditing = true;
      this.currentEventId = event.eventid;
      this.isFormVisible = true;
    },
    updateEvent() {
      const updatedEvent = {
        name: this.eventName,
        description: this.eventDescription,
        eventtype: this.eventType,
        date: this.eventDate,
        starttime: this.eventStartTime,
        endtime: this.eventEndTime,
        location: this.eventLocation,
        attendancetype: this.eventAttendanceType,
      };
      axios
        .put(`http://localhost:8082/api/events/${this.currentEventId}`, updatedEvent, { withCredentials: true })
        .then((response) => {
          eventBus.emit('eventUpdated', response.data);
          this.resetForm();
          this.fetchEvents();
        })
        .catch((error) => {
          console.error('Error updating event:', error);
        });
    },
    deleteEvent(eventId) {
      axios
        .delete(`http://localhost:8082/api/events/${eventId}`, { withCredentials: true })
        .then(() => {
          this.events = this.events.filter((event) => event.eventid !== eventId);
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    },
    resetForm() {
      this.eventName = '';
      this.eventDescription = '';
      this.eventType = '';
      this.eventDate = '';
      this.eventStartTime = '';
      this.eventEndTime = '';
      this.eventLocation = '';
      this.eventAttendanceType = '';
      this.isEditing = false;
      this.currentEventId = null;
      this.isFormVisible = false;
    },
    toggleForm() {
      this.isFormVisible = !this.isFormVisible;
      if (!this.isFormVisible) {
        this.resetForm();
      }
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

<style scoped>
.manage-events {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.refresh-btn {
  background-color: #4CAF50;
  color: white;
}

.no-events {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  margin-top: 20px;
}

.manage-events form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.manage-events input,
.manage-events textarea {
  padding: 5px;
  flex: 1;
}

.manage-events button {
  padding: 5px 10px;
}

.manage-events ul {
  list-style: none;
  padding: 0;
}

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.event-actions {
  display: flex;
  gap: 5px;
}
</style>
