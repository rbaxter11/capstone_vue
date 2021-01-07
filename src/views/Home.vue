<template>
  <div class="home">
    <ul>
      <li class="text-danger" v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>

    <button v-on:click="createMeetupForm()">Create a new meetup</button>
    <div class=" pt90 pb60">
      <div class="container">
        <div class="title-heading1 mb40">
          <h3>Upcoming Meetups</h3>
        </div>
          <div class="card-group">
            <div class="col-sm-4 mb30 wow fadeInUp" data-wow-delay=".2s" style="width: 50rem;" v-for="meetup in meetups" :key="meetup.id">
              <div class="entry-card">
                <a href="`/meetups/${meetup.id}`" class="entry-thumb">
                  <img src="images/entry1.jpg" alt="" class="img-fluid" />
                  <span class="thumb-hover ti-back-right"></span>
                </a>
                <!--/entry thumb-->
                <div class="entry-content">
                  <div class="entry-meta mb5">
                    <span>
                      {{ meetup.start_time | formatDate }}
                    </span>
                  </div>
                  <h4 class="entry-title text-capitalize">
                    <a href="`/meetups/${meetup.id}`">
                      {{ meetup.location_name }}
                    </a>
                  </h4>
                  <p>
                    Game: {{ meetup.game_name }}
                  </p>
                  <p>
                    <p>Players:</p>
<div v-for="player in meetup.players" :key="player.id">
        <p>{{ player.username }}</p>
      </div>
                  <div class="text-right">
                    <a href="/meetups/${meetup.id}" class="btn-link btn">Read More</a>
                  </div>
                </div>
                <!--/entry content-->
            </div>
            <!--/.col-->
          </div>
        </div>
      </div>
    </div>
    <dialog id="meetup-create">
      <form method="dialog">
        <h1>Create a meetup</h1>
        <p>
          Location:
          <input type="text" v-model="newLocation" />
        </p>
        <p>
          When does it start?:
          <!-- <input type="text" v-model="newStartTime" /> -->
          <datetime type="datetime" v-model="newStartTime" use12-hour></datetime>
        </p>
        <p>
          Game:
          <!-- <input type="text" v-model="newGameId" /> -->
          <select v-model="newGameId">
            <option disabled value="">Please select one</option>
            <option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</option>
          </select>
        </p>
        <!-- <p>
          Who's joining you?:
          <select v-model="newParticipantId">
            <option disabled value="">Please select one</option>
            <option v-for="user in users" :key="user.id">{{ user.username }}</option>
          </select>
        </p> -->
        <button v-on:click="createMeetup()">Create</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      message: "Upcoming Meetups",
      meetups: [],
      players: [],
      newLocation: "",
      newGameId: "",
      newParticipantId: "",
      newStartTime: "",
      currentMeetup: {},
      currentUser: [],
      errors: [],
      selected: "",
      games: [],
      users: [],
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
      };
      axios.post("/api/meetups", params).then(response => {
        console.log("Successfully created meetup", response.data);
        this.meetups.push(response.data);
        this.$router.push("/meetups/" + response.data.id);
      });
    },
    createMeetupForm: function() {
      document.querySelector("#meetup-create").showModal();
      axios.get("api/games").then(response => {
        console.log("All games:", response.data);
        this.games = response.data;
      });
      axios.get("api/users").then(response => {
        console.log("All users:", response.data);
        this.users = response.data;
      });
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
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
  },
  filters: {
    formatDate: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
    fromNow: function(date) {
      return moment(date)
        .endOf("day")
        .fromNow();
    },
  },
  components: {},
};
</script>

<router-link v-bind:to="`/meetups/${meetup.id}`">
        <h5>Location Name: {{ meetup.location_name }}</h5>
      </router-link>
<p>Game: {{ meetup.game_name }}</p>
<p>Players:</p>
<div v-for="player in meetup.players" :key="player.id">
        <p>{{ player.username }}</p>
      </div>
<p>{{ meetup.start_time | formatDate }}</p>
<p>{{ meetup.start_time | fromNow }}</p>
