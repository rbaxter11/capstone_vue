<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <button v-on:click="createMeetupForm()">Create a new meetup</button>
    <div v-for="meetup in meetups" :key="meetup.id">
      <h2>Location Name: {{ meetup.location_name }}</h2>
      <p>Time: {{ meetup.start_time }}</p>
    </div>
    <dialog id="meetup-details">
      <form method="dialog">
        <h1>Meetup Info</h1>
        <p>
          Location:
          <input type="text" v-model="newLocation" />
        </p>
        <p>
          Game:
          <input type="text" v-model="newGameId" />
        </p>
        <p>
          Who's joining you?:
          <input type="text" v-model="newParticipantId" />
        </p>
        <p>
          When does it start?:
          <input type="text" v-model="newStartTime" />
        </p>
        <button v-on:click="createMeetup()">Create</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Meetups Index",
      meetups: [],
      newLocation: "",
      newGameId: "",
      newParticipantId: "",
      newStartTime: "",
    };
  },
  created: function() {
    axios.get("/api/meetups").then(response => {
      this.meetups = response.data;
      console.log("All Meetups:", this.meetups);
    });
  },
  methods: {
    createMeetup: function() {
      console.log("Testing create meetup button");
      var params = {
        location: this.newLocation,
        start_time: this.newStartTime,
        game_id: this.newGameId,
        participant_id: this.newParticipantId,
      };
      axios.post("/api/meetups", params).then(response => {
        console.log("Successfully created meetup", response.data);
        this.meetups.push(response.data);
      });
    },
    createMeetupForm: function() {
      document.querySelector("#meetup-details").showModal();
    }
  },
};
</script>
