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
export default {
  data() {
    return {
      events: [], // Fetch this from the backend
      eventName: '',
      eventDate: '',
    };
  },
  methods: {
    fetchEvents() {
      // Fetch events from the backend
    },
    addEvent() {
      // Logic to add an event
    },
    deleteEvent(eventId) {
      // Logic to delete an event
      console.log(`Deleting event with ID: ${eventId}`); // Example usage
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