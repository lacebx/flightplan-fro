<template>
  <div class="manage-events">
    <h1>Manage Events</h1>
    <button @click="toggleForm">{{ isFormVisible ? 'Cancel' : 'Add Event' }}</button>
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
    <ul>
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
      axios
        .get('http://localhost:8082/api/events', { withCredentials: true })
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
        });
    },
    addEvent() {
      const newEvent = {
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
        .post('http://localhost:8082/api/events', newEvent, { withCredentials: true })
        .then((response) => {
          eventBus.emit('eventAdded', response.data);
          this.resetForm();
          this.fetchEvents();
        })
        .catch((error) => {
          console.error('Error adding event:', error);
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
