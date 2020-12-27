<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <ul>
      <li class="text-danger" v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>
    
    <button v-on:click="createMeetupForm()">Create a new meetup</button>
    <div v-for="meetup in meetups" :key="meetup.id">
      
      <h5>Location Name: {{ meetup.location_name }}</h5>
      <p>Game: {{ meetup.game_name }}</p>
      <p>Players: {{ meetup.host_name }} and {{ meetup.participant_name }}</p>
      <p>Time: {{ meetup.start_time }}</p>
      <button v-on:click="showMeetup(meetup)">Details, Edit, Delete!</button>
    </div>
    <dialog id="meetup-details">
      <form method="dialog">
        <h1>Meetup Details</h1>
        <p>
          Location Name:
          <input type="text" v-model="currentMeetup.location_name" />
        </p>
        <p>
          Game ID:
          <input type="text" v-model="currentMeetup.game_id" />
        </p>

        <p>
          Participant ID:
          <input type="text" v-model="currentMeetup.participant_id" />
        </p>
        <p>
          Start Time:
          <input type="text" v-model="currentMeetup.start_time" />
        </p>
        <button v-on:click="updateMeetup(currentMeetup)">Update</button>
        <button v-on:click="deleteMeetup(currentMeetup)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
    <dialog id="meetup-create">
      <form method="dialog">
        <h1>Create a meetup</h1>
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
      currentMeetup: {},
      currentUser: [],
      errors: [],
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
        location_name: this.newLocation,
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
      document.querySelector("#meetup-create").showModal();
    },
    showMeetup: function(meetup) {
      console.log(meetup);
      this.currentMeetup = meetup;
      document.querySelector("#meetup-details").showModal();
    },
    updateMeetup: function(meetup) {
      var params = {
        location_name: meetup.location_name,
        game_id: meetup.game_id,
        participant_id: meetup.participant_id,
        start_time: meetup.start_time,
      };
      axios.patch("api/meetups/" + meetup.id, params).then(response => {
        console.log("Successfully updated meetup", response.data);
      });
    },
    deleteMeetup: function(meetup) {
      axios.delete("api/meetups/" + meetup.id).then(response => {
        console.log("Meetup deleted", response.data);
        var index = this.meetups.indexOf(meetup);
        this.meetups.splice(index, 1);
      });
    },
    getUser: function() {
      axios.get("api/users/1").then(response => {
        console.log(response.data);
        this.currentUser = response.data;
      });
    },
  },
};
</script>
