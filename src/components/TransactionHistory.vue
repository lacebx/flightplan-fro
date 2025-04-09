<template>


 <div class="transaction-history">
    <!-- Reuse the floating spheres background -->
    <div class="animated-bg">

      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>








    <h2>Transaction History</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  </div>
</template>

<script>

export default {
  name: 'TransactionHistory',
  data() {
    return {
      transactions: [
        { id: 1, date: '2025-04-01', description: 'Gift Card Redemption', amount: 50, type: 'debit' },
        { id: 2, date: '2025-04-05', description: 'Points Earned from Purchase', amount: 20, type: 'credit' },
        // Add more transactions as needed
      ],
    };
  },
};
</script>

<style scoped>
.transaction-history {
   font-family: Arial, sans-serif;  
  margin: 0px auto;
  max-width: 2500px;
  padding: 0px;
  text-align: center;
}


table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}


</style>