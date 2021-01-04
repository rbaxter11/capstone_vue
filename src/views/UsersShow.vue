<template>
  <div class="about">
    <h1>{{ user.username }}'s Page</h1>
      <h5>Number of games in collection: {{ user.quantity }}</h5>
    <div v-for="game in user.users_games" :key="game.id">
        <h6>{{ game.name }}</h6>
      </div>
      <button>Invite this user to a Meetup!</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to the Users Index",
      user: [],
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log("Showing a user", this.user);
});
  },
  methods: {
    // addGame: function(game) {
    //   var params = {
    //     game_id: game.id,
    //     user_id: localStorage.getItem("user_id"),
    //   }
    //   axios.post("api/game_ownerships/", params).then(response => {
    //     console.log("Game added to collection"), response.data;
    //   })
    // }
  },
};
</script>