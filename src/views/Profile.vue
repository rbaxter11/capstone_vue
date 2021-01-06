<template>
  <div class="home">
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
            <div v-for="meetup in invitation.meetups" :key="meetup.id">
            <!-- <h6>Start Time: {{ invitation.host_name }}</h6> -->
            <h6>Location: {{ meetup.location_name }}</h6>
            </div>
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
    <button v-on:click="createGameForm()">Add a game to my collection</button>
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
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

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
      // this.currentMeetup = meetup;
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
      var params = {
        accepted: false,
      };
      axios.patch("api/meetup_invitations/" + invitation.id, params).then(response => {
        console.log("Invitation Declined!", response.data);
      });
    },
  },
};
</script>
