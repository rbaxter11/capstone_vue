<template>
  <div class="about">
    <h1>Meetup at: {{ meetups.location_name }}</h1>
    <h3>Game: {{ meetups.game_name }}</h3>
    <h3>Start time: {{ meetups.start_time | formatDate }}</h3>
    <h3>Host: {{ meetups.host_name }}</h3>
    <h3>Invited players:</h3>
    <h3>Attending players:</h3>
    <div v-for="player in meetups.players" :key="player.id">
      <h6>{{ player.username }}</h6>
    </div>
    <button v-on:click="showMeetup(meetups)">Edit or Delete!</button>
    <dialog id="meetup-details">
      <form method="dialog">
        <h1>Meetup Details</h1>
        <p>
          Location Name:
          <input type="text" v-model="meetups.location_name" />
        </p>
        <p>
          Game (search by name):
          <select v-model="meetups.game_id">
            <option disabled value="">Please select one</option>
            <option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</option>
          </select>
        </p>
        <p>
          Start Time:
          <datetime type="datetime" v-model="meetups.start_time" use12-hour></datetime>
        </p>
        <button v-on:click="updateMeetup(currentMeetup)">Update</button>
        <button v-on:click="deleteMeetup(currentMeetup)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
    <h1>Invite Players to meetup!</h1>
    <div v-for="user in users" :key="user.id">
      {{ user.username }}
      <button v-on:click="sendInvite(user)">Invite</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      message: "",
      meetups: [],
      currentMeetup: {},
      allMeetups: [],
      games: [],
      users: [],
    };
  },
  created: function() {
    axios.get("/api/meetups/" + this.$route.params.id).then(response => {
      this.meetups = response.data;
      console.log("Showing a meetup", this.meetups);
    });
    axios.get("/api/users").then(response => {
      this.users = response.data;
      console.log("Showing all users", this.users);
    });
  },
  methods: {
    showMeetup: function(meetup) {
      console.log(meetup);
      this.currentMeetup = meetup;
      document.querySelector("#meetup-details").showModal();
      axios.get("api/games").then(response => {
        console.log("All games:", response.data);
        this.games = response.data;
      });
    },
    updateMeetup: function(meetup) {
      var params = {
        location_name: meetup.location_name,
        game_id: meetup.game_id,
        start_time: meetup.start_time,
      };
      axios.patch("api/meetups/" + meetup.id, params).then(response => {
        console.log("Successfully updated meetup", response.data);
      });
    },
    deleteMeetup: function(meetup) {
      axios.get("api/meetups").then(response => {
        console.log("All Meetups", response.data);
      });
      axios.delete("api/meetups/" + meetup.id).then(response => {
        console.log("Meetup deleted", response.data);
        var index = this.allMeetups.indexOf(meetup);
        this.allMeetups.splice(index, 1);
        this.$router.push("/");
      });
    },
    sendInvite: function(user) {
      var params = {
        meetup_id: this.meetups.id,
        user_id: user.id,
      };
      axios.post("api/meetup_invitations/", params).then(response => {
        console.log("Invitation sent!"), response.data;
      });
    },
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm a');
    },
    fromNow: function (date) {
      return moment(date).endOf('day').fromNow();
    },
  },
};
</script>