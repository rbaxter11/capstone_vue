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
    sendInvite: function(user) {
      var params = {
        meetup_id: this.meetups.id,
        user_id: user.id,
      };
      axios.post("api/meetup_invitations/", params).then(response => {
        console.log("Invitation sent!"), response.data;
      });
    },
  },
};
</script>