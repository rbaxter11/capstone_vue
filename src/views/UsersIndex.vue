<template>
  <div class="about">
    <div class="container mb50">
      <br />
      <br />
      <div class="title-heading1 mb40">
        <h3>All overBoard Members</h3>
      </div>
      <div class="row pb60">
        <div v-for="user in users" :key="user.id" class="col-lg-3 col-md-6  mb30">
          <div class="team-card-default">
            <img v-bind:src="`${user.avatar}`" alt="" class="img-fluid rounded-circle" />
            <div class="team-default-content text-center pt30">
              <router-link v-bind:to="`/users/${user.id}`">
                <h4 class="mb0 text-uppercase">{{ user.username }}</h4>
              </router-link>
              <br>
              <span>overBoard Member since {{ user.tenure | formatDate }}</span>
              <h6></h6>
              <h6>Total Games: {{ user.quantity }}</h6>
              <h6>Invitations Sent: {{ user.invites_sent }}</h6>
              <h6>Recent Games:</h6>
              <span>{{ user.first_game }}</span>
              <router-link v-bind:to="`/users/${user.id}`">
              <button type="button" class="btn btn-outline-info mb5">
                See their collection!
              </button>
              </router-link>
            </div>
          </div>
        </div>
        <!--/col-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      message: "Welcome to the Users Index",
      users: [],
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      this.users = response.data;
      console.log("All Users:", this.users);
    });
  },
  methods: {},
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

<h1>User Database</h1>
<h4>Browse other user's collections!</h4>
<div v-for="user in users" :key="user.id">
      <router-link v-bind:to="`/users/${user.id}`">
        <h4>{{ user.username }}</h4>
      </router-link>
      <h5>Games at a glance:</h5>
      <div v-for="game in user.users_games" :key="game.id">
        <h6>{{ game.name }}</h6>
      </div>
    </div>
