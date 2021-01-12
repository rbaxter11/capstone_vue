<template>
  <div class="about">

    <h1>User Database</h1>
    <h4>Browse other user's collections!</h4>
    <div v-for="user in users" :key="user.id">
      <router-link v-bind:to="`/users/${user.id}`">
      <h4>{{ user.username }}</h4>
      </router-link>
      <h5>Games at a glance:</h5>
      <div v-for="game in user.users_games" :key="game.id">
        <h6>{{ game.name }}</h6>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to the Users Index",
      users: [],
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      this.users = response.data;
      console.log("All Users:", this.users);
});
  },
  methods: {
  },
};
</script>