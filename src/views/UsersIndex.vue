<template>
  <div class="about">
    <div class="container mb50">
      <br>
      <br>
      <div class="title-heading1 mb40">
        <h3>All Collections</h3>
      </div>
      <div class="row">
        <div v-for="user in users" :key="user.id" class="col-md-4 mb30">
          <h4>{{ user.username }}</h4>
          <h6>Games at a glance:</h6>
          <div v-for="game in user.users_games" :key="game.id">
        <p>{{ game.name }}</p>
      </div>
      <router-link v-bind:to="`/users/${user.id}`">
      <button class="btn btn-sm btn-link btn-outline-primary">More Info</button>
      </router-link>
        </div>


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
  methods: {},
};
</script>

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