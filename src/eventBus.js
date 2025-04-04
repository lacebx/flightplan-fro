import { ref } from 'vue';

export const eventBus = ref({
  events: [],
  addEvent(event) {
    this.events.push(event);
  },
  deleteEvent(eventId) {
    this.events = this.events.filter(event => event.id !== eventId);
  }
});