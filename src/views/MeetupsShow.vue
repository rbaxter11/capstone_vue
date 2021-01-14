<template>
  <div class="about">
    <br />
    <div class="container">
      <div class="row pb50 align-item-center">
        <div class="col-sm-6 mb40">
          <h2>Meetup: {{ meetups.location_name }}</h2>
          <p class="lead">Address: {{ meetups.address }}</p>
          <p class="lead">Game: {{ meetups.game_name }}</p>
          <p class="lead">Start time: {{ meetups.start_time | formatDate }}</p>
          <p class="lead">Host: {{ meetups.host_name }}</p>
          <p>
            Pending Invites:
          </p>
          <div v-for="invitation in meetups.invitations" :key="`pending_invitation_${invitation.id}`">
            <h6 v-if="invitation.accepted === false">{{ invitation.user.username }}</h6>
          </div>
          <p>
            Attending Players:
          </p>
          <div v-for="invitation in meetups.invitations" :key="`attending_invitation_${invitation.id}`">
            <h6 v-if="invitation.accepted === true">{{ invitation.user.username }}</h6>
          </div>
          <a v-on:click="showMeetup(meetups)" href="#" class="btn btn-secondary">Edit Meetup</a>
        </div>
        <div class="col-sm-6 mb40">
          <img src="images/meetup.jpg" alt="" class="img-fluid" />
        </div>
      </div>
    </div>

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
    <div class="title-heading1 mb60">
      <h3>Invite some other people!</h3>
    </div>
    <div class="row pb60">
      <div v-for="user in users" :key="`user_${user.id}`" class="col-lg-3 col-md-6  mb30">
        <div class="team-card-default">
          <img v-bind:src="`${user.avatar}`" alt="" class="img-fluid rounded-circle" />
          <div class="team-default-content text-center pt30">
            <router-link v-bind:to="`/users/${user.id}`">
              <h4 class="mb0 text-uppercase">{{ user.username }}</h4>
            </router-link>
            <span>overBoard Member</span>
            <h2></h2>

            <!-- Small modal -->
            <button
              v-on:click="sendInvite(user)"
              type="button"
              class="btn btn-outline-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
            >
              Invite!
            </button>

            <div
              class="modal fade bd-example-modal-sm"
              tabindex="-1"
              role="dialog"
              aria-labelledby="mySmallModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-sm">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Invitation Sent!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--modal-->
          </div>
        </div>
      </div>
      <!--/col-->
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
      setTimeout(() => this.$router.go(), 1000);
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
};
</script>

<h1>Invite Players to meetup!</h1>
<div v-for="user in users" :key="user.id">
      {{ user.username }}
      <button v-on:click="sendInvite(user)">Invite</button>
    </div>

<h1>Meetup: {{ meetups.location_name }}</h1>
<h3>Game: {{ meetups.game_name }}</h3>
<h3>Start time: {{ meetups.start_time | formatDate }}</h3>
<h3>Host: {{ meetups.host_name }}</h3>
<h3>Invited players:</h3>
<h3>Attending players:</h3>
<div v-for="player in meetups.players" :key="player.id">
      <h6>{{ player.username }}</h6>
    </div>
<button v-on:click="showMeetup(meetups)">Edit or Delete!</button>

<div class="col-lg-3 col-md-6 mb40">
      <!-- Button trigger modal -->
      <button
        v-on:click="showMeetup(meetups)"
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Create a Meetup
      </button>
      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create a Meetup</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                Location:
                <br />
                <input type="text" v-model="newLocation" />
              </p>
              <p>
                When does it start?:
                <datetime type="datetime" v-model="newStartTime" use12-hour></datetime>
              </p>
              <p>
                Game:
                <br />
                <select v-model="newGameId">
                  <option disabled value="">Please select one</option>
                  <option v-for="game in games" :value="game.id" :key="game.id">{{ game.name }}</option>
                </select>
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button v-on:click.prevent="createMeetup()" type="button" class="btn btn-primary" data-dismiss="modal">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--/modal-->
    </div>
