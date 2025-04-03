<template>
  <div class="redemption-page">
    <!-- Reuse the floating spheres background -->
    <div class="animated-bg">

      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
  
    
   

   
<h1>Available Awards</h1>
    <div v-if="loading" class="loading">Loading rewards...</div>
    <div v-else class="rewards-grid">
      <div v-for="reward in sortedRewards" :key="reward.id" class="reward-card">
        <h2>{{ reward.item_name }}</h2>
        <p>{{ reward.description }}</p>
        <p>Cost: {{ reward.points_cost }} points</p>
        <p v-if="!reward.availability" class="unavailable">Out of Stock</p>
        <button
          :disabled="!reward.availability || userPoints < reward.points_cost"
          @click="redeemReward(reward)"
        >
          Redeem
        </button>
      </div>
    </div>
    <p class="user-points">Your Points: {{ userPoints }}</p>

</div>
</div>
      

    
</template>


<script>
export default {
  name: 'RedemptionPage',
  data() {
    return {
      userPoints: 1500, // Example starting points
      rewardsList: [],
      loading: false,
    };
  },
  computed: {
    sortedRewards() {
      return this.rewardsList.slice().sort((a, b) => a.points_cost - b.points_cost);
    },
  },
  created() {
    this.fetchRewards();
  },
  methods: {
    fetchRewards() {
      this.loading = true;
      // Simulate API call delay and add 9 sample rewards for a 3x3 grid.
      setTimeout(() => {
        this.rewardsList = [
          {
            id: 1,
            item_name: 'Gift Card',
            description: 'A $50 gift card.',
            points_cost: 500,
            availability: true,
          },
          {
            id: 2,
            item_name: 'Wireless Headphones',
            description: 'Noise-cancelling over-ear headphones.',
            points_cost: 1200,
            availability: true,
          },
          {
            id: 3,
            item_name: 'Coffee Mug',
            description: 'A branded coffee mug.',
            points_cost: 300,
            availability: false,
          },
          {
            id: 4,
            item_name: 'E-Book Voucher',
            description: 'Voucher for an e-book of your choice.',
            points_cost: 400,
            availability: true,
          },
          {
            id: 5,
            item_name: 'Online Course Discount',
            description: 'Discount on an online course.',
            points_cost: 800,
            availability: true,
          },
          {
            id: 6,
            item_name: 'Stationery Set',
            description: 'A set of notebooks, pens, and more.',
            points_cost: 350,
            availability: true,
          },
          {
            id: 7,
            item_name: 'Backpack',
            description: 'A durable and stylish backpack.',
            points_cost: 1000,
            availability: true,
          },
          {
            id: 8,
            item_name: 'Water Bottle',
            description: 'A reusable water bottle.',
            points_cost: 250,
            availability: true,
          },
          {
            id: 9,
            item_name: 'Desk Organizer',
            description: 'Keep your workspace neat and tidy.',
            points_cost: 450,
            availability: true,
          },
        ];
        this.loading = false;
      }, 500); // Simulated delay
    },
    redeemReward(reward) {
      if (this.userPoints >= reward.points_cost && reward.availability) {
        this.userPoints -= reward.points_cost;
        alert(`You have redeemed: ${reward.item_name}`);
        // Additional logic (e.g., update reward availability) can be added here.
      } else {
        alert('Insufficient points or item not available.');
      }
    },
  },
};
</script>






<style scoped>

.redemption-page {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 1200px;
  padding: 20px;
  text-align: center;
}

.loading {
  font-size: 18px;
  text-align: center;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  margin-bottom: 20px;
}

.reward-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

.reward-card h2 {
  margin: 0 0 10px;
}

.reward-card p {
  margin: 5px 0;
}

.reward-card button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.reward-card button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.unavailable {
  color: red;
  font-weight: bold;
}

.user-points {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}





@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .floating-stats {
    flex-direction: column;
    align-items: center;
  }
  .stat-bubble {
    width: 100px;
    height: 100px;
  }
}
</style>
