<template>
    <div class="admin-task-approvals">
      <!-- Animated Background -->
      <div class="animated-bg">
        <div class="gradient-sphere"></div>
        <div class="gradient-sphere"></div>
        <div class="gradient-sphere"></div>
      </div>

      <div class="content-container">
        <div class="header-section glass-morphism">
          <h2><i class="fas fa-tasks"></i> Pending Task Approvals</h2>
          <div class="stats-banner">
            <div class="stat-item">
              <i class="fas fa-clock"></i>
              <div class="stat-details">
                <span class="stat-value">{{ pendingRequests.length }}</span>
                <span class="stat-label">Pending Tasks</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tasks-container glass-morphism" v-if="pendingRequests.length === 0">
          <div class="empty-state">
            <i class="fas fa-check-circle"></i>
            <p>No pending task approvals</p>
            <span>All tasks have been reviewed</span>
          </div>
        </div>

        <div class="tasks-grid" v-else>
          <div class="task-approval-card glass-morphism" v-for="request in pendingRequests" :key="request.id">
            <div class="card-header">
              <div class="task-id">
                <i class="fas fa-hashtag"></i>
                <span>{{ request.taskId }}</span>
              </div>
              <div class="task-status">Pending Review</div>
            </div>

            <div class="card-body">
              <div class="info-group">
                <label><i class="fas fa-tasks"></i> Task Name</label>
                <p>{{ request.task.name }}</p>
              </div>

              <div class="user-info">
                <div class="avatar">
                  <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                  <h4>{{ request.user.firstName }} {{ request.user.lastName }}</h4>
                  <span class="id-number">ID: {{ request.user.idNumber }}</span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div class="action-buttons">
                <button class="decline-btn" @click="declineTaskCompletion(request)">
                  <i class="fas fa-times"></i>
                  Decline
                </button>
                <button class="approve-btn" @click="approveTaskCompletion(request)">
                  <i class="fas fa-check"></i>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import eventBus from '../eventBus';
  
  export default {
    name: 'AdminTaskApprovalsView',
    data() {
      return {
        pendingRequests: [],
        refreshInterval: null,
      };
    },
    methods: {
      fetchPendingRequests() {
        axios.get('http://localhost:8082/api/admin/pending-task-approvals', { withCredentials: true })
          .then(response => {
            this.pendingRequests = response.data;
            console.log('Pending task approvals fetched:', this.pendingRequests);
            
            // Emit the updated count
            eventBus.emit('updatePendingTasksCount', this.pendingRequests.length);
          })
          .catch(error => {
            console.error('Error fetching pending task approvals:', error);
          });
      },
      approveTaskCompletion(request) {
        // Remove from UI immediately
        this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
        
        // Emit the updated count immediately
        eventBus.emit('updatePendingTasksCount', this.pendingRequests.length);

        axios.put(`http://localhost:8082/api/tasks/${request.taskId}/approve-completion`, 
          { userId: request.userId }, 
          { withCredentials: true }
        )
          .then(response => {
            console.log('Task completion approved:', response.data);
            // Emit an event using mitt
            eventBus.emit('taskApproved', request.taskId);
          })
          .catch(error => {
            console.error('Error approving task completion:', error);
            // If there's an error, add the request back to the list
            this.pendingRequests.push(request);
            // Re-emit the count after restoring
            eventBus.emit('updatePendingTasksCount', this.pendingRequests.length);
            alert('Error approving task. Please try again.');
          });
      },
      declineTaskCompletion(request) {
        // Store the request before removing it from the list
        const originalRequest = { ...request };
        
        // Remove from UI immediately for better user experience
        this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
        
        // Emit the updated count immediately
        eventBus.emit('updatePendingTasksCount', this.pendingRequests.length);
        
        // Update the API endpoint to match the backend route
        axios.put(`http://localhost:8082/api/admin/tasks/${request.taskId}/decline`, 
          { 
            userId: request.userId,
            taskId: request.taskId,
            status: 'declined'
          }, 
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => {
            if (response.data && response.status === 200) {
              console.log('Task completion declined successfully:', response.data);
              // Update the task status
              request.status = 'declined';
              // Emit an event using mitt
              eventBus.emit('taskDeclined', request.taskId);
            } else {
              throw new Error('Invalid response from server');
            }
          })
          .catch(error => {
            console.error('Error declining task completion:', error);
            console.error('Error details:', error.response?.data);
            
            // Restore the task to the list
            this.pendingRequests.push(originalRequest);
            // Re-emit the count after restoring
            eventBus.emit('updatePendingTasksCount', this.pendingRequests.length);
            
            // Show more specific error message
            const errorMessage = error.response?.data?.message || 
              (error.response?.status === 404 ? 'Task not found or already processed' : error.message) || 
              'Error declining task';
            alert(errorMessage);
          });
      }
    },
    mounted() {
      this.fetchPendingRequests();
      // Set up an interval to refresh the pending requests periodically
      this.refreshInterval = setInterval(() => {
        this.fetchPendingRequests();
      }, 30000); // Refresh every 30 seconds
    },
    beforeUnmount() {
      // Clear the interval when component is destroyed
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-task-approvals {
    min-height: 100vh;
    padding: 2rem;
    position: relative;
    background: #0a0a0a;
    color: white;
    overflow: hidden;
  }

  /* Animated Background */
  .animated-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }

  .gradient-sphere {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.5;
    animation: float 20s infinite ease-in-out;
  }

  .gradient-sphere:nth-child(1) {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #41b883 0%, transparent 70%);
    top: -200px;
    left: -200px;
    animation-delay: -5s;
  }

  .gradient-sphere:nth-child(2) {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #3aa876 0%, transparent 70%);
    bottom: -150px;
    right: -150px;
    animation-delay: -10s;
  }

  .gradient-sphere:nth-child(3) {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #2c3e50 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -15s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(50px, 50px); }
    50% { transform: translate(0, 100px); }
    75% { transform: translate(-50px, 50px); }
  }

  .content-container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  .glass-morphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .header-section {
    padding: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .header-section h2 {
    font-size: 2.5rem;
    color: #41b883;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .stats-banner {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    background: rgba(65, 184, 131, 0.1);
    border-radius: 12px;
  }

  .stat-item i {
    font-size: 1.5rem;
    color: #41b883;
  }

  .stat-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #41b883;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #888;
  }

  .tasks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .task-approval-card {
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .task-approval-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .task-id {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #888;
  }

  .task-status {
    background: rgba(65, 184, 131, 0.1);
    color: #41b883;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  .card-body {
    margin-bottom: 1.5rem;
  }

  .info-group {
    margin-bottom: 1.5rem;
  }

  .info-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .info-group p {
    margin: 0;
    font-size: 1.1rem;
    color: white;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    background: rgba(65, 184, 131, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar i {
    font-size: 1.5rem;
    color: #41b883;
  }

  .user-details {
    flex: 1;
  }

  .user-details h4 {
    margin: 0;
    font-size: 1.1rem;
    color: white;
  }

  .id-number {
    font-size: 0.9rem;
    color: #888;
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
  }

  .approve-btn, .decline-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .approve-btn {
    background: #41b883;
  }

  .approve-btn:hover {
    background: #3aa876;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(65, 184, 131, 0.2);
  }

  .decline-btn {
    background: #e74c3c;
  }

  .decline-btn:hover {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-state i {
    font-size: 4rem;
    color: #41b883;
    margin-bottom: 1rem;
  }

  .empty-state p {
    font-size: 1.5rem;
    margin: 0;
    color: white;
  }

  .empty-state span {
    color: #888;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .admin-task-approvals {
      padding: 1rem;
    }

    .tasks-grid {
      grid-template-columns: 1fr;
    }

    .header-section h2 {
      font-size: 2rem;
    }

    .stat-item {
      padding: 0.8rem 1.5rem;
    }
  }
  </style>