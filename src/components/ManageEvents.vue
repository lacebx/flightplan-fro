```language:src/components/ManageEvents.vue
<template>
  <div class="manage-events">
    <h1>Manage Events</h1>
    <form @submit.prevent="addEvent">
      <input type="text" v-model="eventName" placeholder="Event Name" required />
      <input type="date" v-model="eventDate" required />
      <button type="submit">Add Event</button>
    </form>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.name }} - {{ event.date }}
        <button @click="deleteEvent(event.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../eventBus';

export default {
  data() {
    return {
      events: eventBus.value.events,
      eventName: '',
      eventDate: '',
    };
  },
  methods: {
    fetchEvents() {
      axios.get('http://localhost:8082/api/events', { withCredentials: true })
        .then(response => {
          eventBus.value.events = response.data;
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    },
    addEvent() {
      const newEvent = {
        name: this.eventName,
        date: this.eventDate,
      };
      axios.post('http://localhost:8082/api/events', newEvent, { withCredentials: true })
        .then(response => {
          eventBus.value.addEvent(response.data);
          this.eventName = '';
          this.eventDate = '';
          this.$emit('eventAdded', response.data); // Emit eventAdded event
        })
        .catch(error => {
          console.error('Error adding event:', error);
        });
    },
    deleteEvent(eventId) {
      axios.delete(`http://localhost:8082/api/events/${eventId}`, { withCredentials: true })
        .then(() => {
          eventBus.value.deleteEvent(eventId);
        })
        .catch(error => {
          console.error('Error deleting event:', error);
        });
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

<style scoped>
.manage-events {
  /* Add styles for managing events */
}
</style>