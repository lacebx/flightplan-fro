<template>
  <div class="tasks-events">
    <h2>Tasks & Events</h2>
    <div class="tasks">
      <h3>Tasks</h3>
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
      </ul>
    </div>
    <div class="events">
      <h3>Upcoming Events</h3>
      <div class="events-list">
        <div class="event-item" v-for="event in events" :key="event.id">
          <h4>{{ event.name }}</h4>
          <p>{{ event.description }}</p>
          <p>{{ event.date }} at {{ event.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksAndEventsView',
  data() {
    return {
      tasks: [
        { id: 1, name: 'Complete resume' },
        { id: 2, name: 'Prepare for interview' },
      ],
      events: [
        {
          id: 1,
          name: 'Resume Writing Workshop',
          description: 'Learn how to create a professional resume that stands out to employers.',
          date: 'April 15, 2024',
          time: '2:00 PM',
        },
        {
          id: 2,
          name: 'Spring Career Fair',
          description: 'Meet with representatives from top companies across various industries.',
          date: 'April 20, 2024',
          time: '10:00 AM',
        },
      ],
    };
  },
};
</script>

<style scoped>
.tasks-events {
  padding: 20px;
}
.tasks, .events {
  margin-bottom: 20px;
}
</style> 