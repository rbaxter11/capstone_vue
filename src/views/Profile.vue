<template>
  <div class="home">
    <br />
    <div class="container mb30">
      <article class="col-md-12 post-masonry mb40">
        <a href="#"><img src="images/collection.jpg" alt="" class="img-fluid mb20" /></a>

        <h3></h3>
        <div class="title-heading1 mb40">
          <h3>{{ currentUser.username }}'s Profile</h3>
        </div>
        <div v-for="invitation in currentUser.invitations" :key="invitation.id">
          <div v-if="invitation.accepted === false">
            <h6>Invite from {{ invitation.host_name }}</h6>
            <button v-on:click="showInvite(invitation)">View</button>
            <button v-on:click="acceptInvite(invitation)">Accept</button>
            <button v-on:click="declineInvite(invitation)">Decline</button>
          </div>

          <button v-if="invitation.accepted === false" type="button" class="btn btn-danger mb5 btn-rounded">
            Hey! Someone invited you to a Meetup!
          </button>
        </div>
        <div class="container">
          <div class="row pb50 align-item-center">
            <div class="col-sm-6 mb40">
              <br />
              <h3 class="masonry-title mb0">Username:</h3>
              <h3 class="lead">{{ currentUser.username }}</h3>
              <h3 class="masonry-title mb0">Bio:</h3>
              <h3 class="lead">{{ currentUser.bio }}</h3>
              <h3 class="masonry-title mb0">Member since:</h3>
              <h3 class="lead">{{ currentUser.tenure | formatDate }}</h3>
            </div>
            <div class="col-sm-6 mb40">
              <img v-bind:src="`${currentUser.avatar}`" alt="" class="img-fluid rounded-circle" />
            </div>
          </div>
        </div>
        <dialog id="invite-details">
          <form method="dialog">
            <h2>Invitation Details</h2>
            <h2>ID: {{ currentInvite.id }}</h2>
            <h6>Invite from: {{ currentInvite.host_name }}</h6>
            <h6>Game to be played: {{ currentInvite.game_name }}</h6>
            <!-- This still doesn't work fully, trying to get location_name and host_name of meetup to display in modal -->
            <!-- <div v-for="meetup in invitation.meetups" :key="meetup.id"> -->
            <!-- <h6>Start Time: {{ invitation.host_name }}</h6> -->
            <!-- <h6>Location: {{ meetup.location_name }}</h6> -->
            <!-- </div> -->
            <button>Close</button>
          </form>
        </dialog>
        <a v-on:click="createGameForm()" class="btn btn-outline-secondary">Add a game to my collection</a>
        <dialog id="game-details">
          <form method="dialog">
            <h1>Add a Game</h1>
            <p>
              Name:
              <input type="text" v-model="newName" />
            </p>
            <p>
              Number of Players:
              <input type="text" v-model="newNum" />
            </p>
            <p>
              Duration:
              <input type="text" v-model="newDuration" />
            </p>
            <p>
              How old should you be to play?:
              <input type="text" v-model="newDifficulty" />
            </p>
            <p>
              Link some boxart:
              <input type="text" v-model="newBoxart" />
            </p>
            <button v-on:click="createGame()">Create</button>
            <button>Close</button>
          </form>
        </dialog>
      </article>
      <div class="title-heading1 mb40">
        <h3>{{ currentUser.username }}'s Collection</h3>
      </div>
      <div class="card-columns">
        <div
          class="col-sm-4 mb30 wow fadeInUp"
          style="max-width: 40vh; max-height: relative; object-fit: contain; overflow: hidden;"
          v-for="currentGame in currentUser.users_games"
          :key="currentGame.id"
        >
          <img
            v-bind:to="`/games/${currentGame.id}`"
            class="card-img-top img-fluid"
            v-bind:src="`${currentGame.boxart}`"
            alt="Card image cap"
          />
          <div class="card-body">
            <router-link v-bind:to="`/games/${currentGame.id}`">
              <h4 class="card-title">
                {{ currentGame.name }}
              </h4>
            </router-link>
            <!-- <div class="col-lg-3 col-md-6 mb40"> -->
            <!-- Small modal -->

            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      message: "Welcome to your profile page!",
      newName: "",
      newNum: "",
      newDuration: "",
      newDifficulty: "",
      newBoxart: "",
      games: [],
      currentUser: [],
      currentUserInvites: [],
      currentInvite: {},
    };
  },
  created: function() {
    axios.get("/api/users/" + localStorage.getItem("user_id")).then(response => {
      console.log("Showing users' data", response.data);
      this.currentUser = response.data;
      this.currentUserInvites = response.data.invitations;
      console.log("Showing users' invitations", this.currentUserInvites);
    });
  },
  methods: {
    createGame: function() {
      console.log("Testing create game button");
      var params = {
        name: this.newName,
        num_of_players: this.newNum,
        duration: this.newDuration,
        difficulty: this.newDifficulty,
        boxart: this.newBoxart,
      };
      axios.post("/api/games", params).then(response => {
        console.log("Successfully created game", response.data);
        this.games.push(response.data);
      });
    },
    createGameForm: function() {
      document.querySelector("#game-details").showModal();
    },
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    showInvite: function(invitation) {
      console.log("Invitation details", invitation);
      this.currentInvite = invitation;
      document.querySelector("#invite-details").showModal();
    },
    acceptInvite: function(invitation) {
      var params = {
        accepted: true,
      };
      axios.patch("api/meetup_invitations/" + invitation.id, params).then(response => {
        console.log("Invitation Accepted!", response.data);
      });
    },
    declineInvite: function(invitation) {
      // var params = {
      //   accepted: false,
      // };
      // axios.patch("api/meetup_invitations/" + invitation.id, params).then(response => {
      //   console.log("Invitation Declined!", params, response.data);
      // });
      axios.delete("api/meetup_invitations/" + invitation.id).then(response => {
        console.log("Invitation Declined!", response.data);
      });
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

<h1>{{ message }}</h1>
<div v-if="currentUserInvites.accepted === 'false'">
      <h3>Invites awaiting approval:</h3>
    </div>
<div v-for="invitation in currentUser.invitations" :key="invitation.id">
      <h6>Invite from {{ invitation.host_name }}</h6>
      <button v-on:click="showInvite(invitation)">View</button>
      <dialog id="invite-details">
        <form method="dialog">
          <h2>Invitation Details</h2>
          <h6>Invite from: {{ invitation.host_name }}</h6>
          <h6>Game to be played: {{ invitation.game_name }}</h6>
          <!-- This still doesn't work fully, trying to get location_name and host_name of meetup to display in modal -->
          <!-- <div v-for="meetup in invitation.meetups" :key="meetup.id"> -->
          <!-- <h6>Start Time: {{ invitation.host_name }}</h6> -->
          <!-- <h6>Location: {{ meetup.location_name }}</h6> -->
          <!-- </div> -->
          <button>Close</button>
        </form>
      </dialog>
      <button v-on:click="acceptInvite(invitation)">Accept</button>
      <button v-on:click="declineInvite(invitation)">Decline</button>
    </div>

<h2>Username: {{ currentUser.username }}</h2>
<h4>Here's your collection:</h4>
<div v-for="currentGame in currentUser.users_games" :key="currentGame.id">
      <router-link v-bind:to="`/games/${currentGame.id}`">
        <h6>{{ currentGame.name }}</h6>
        <img v-bind:src="`${currentGame.boxart}`" alt="" />
      </router-link>
    </div>

<article v-for="currentGame in currentUser.users_games" :key="currentGame.id" class="col-md-4 post-masonry mb40">
          <router-link v-bind:to="`/games/${currentGame.id}`">
            <a href="#"><img v-bind:src="`${currentGame.boxart}`" alt="" class="img-fluid mb20" /></a>
            <a href="#">
              <h4 class="masonry-title mb0">{{ currentGame.name }}</h4>
            </a>
          </router-link>
        </article>
