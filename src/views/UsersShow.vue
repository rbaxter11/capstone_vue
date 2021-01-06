<template>
  <div class="about">
    <h1>{{ user.username }}'s Page</h1>
      <h5>Number of games in collection: {{ user.quantity }}</h5>
    <div v-for="game in user.users_games" :key="game.id">
        <h6>{{ game.name }}</h6>
      </div>
      <button v-on:click="showInvite()">Invite this user to a Meetup!</button>
      <dialog id="meetup-details">
        <form method="dialog">
          <div v-for="meetup in meetups" :key="meetup.id">
            {{ meetup.location_name }}
            <button v-on:click="sendInvite(meetup)">Invite 'em!</button>
          </div>
          <button>close</button>
        </form>
      </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to the Users Index",
      user: [],
      meetups: [],
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log("Showing a user", this.user);
});
    axios.get("/api/meetups").then(response => {
      this.meetups = response.data;
      console.log("Showing all meetups", this.meetups);
});
  },
  methods: {
    sendInvite: function(meetup) {
      var params = {
        meetup_id: meetup.id,
        user_id: this.user.id,
      };
      axios.post("api/meetup_invitations/", params).then(response => {
        console.log("Invitation sent!"), response.data;
      });
    },
    showInvite: function() {
      console.log("Pick a meetup");
      document.querySelector("#meetup-details").showModal();
    },
  },
};
</script>