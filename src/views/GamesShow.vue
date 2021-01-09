<template>
  <div class="about">
    <div class="row pb50 align-item-center">
      <div class="col-sm-6 mb40">
        <h2>{{ game.name }}</h2>
        <p class="lead">Number of players: {{ game.num_of_players }}</p>
        <p>Duration: {{ game.duration }}</p>
        <p>Difficulty (Minimum Age): {{ game.difficulty }}</p>
        <a href="#" class="btn btn-primary">Add to my Collection</a>
      </div>
      <div class="col-sm-6 mb40">
        <div class="carousel-image owl-carousel owl-theme carousel-dark">
          <div class="item">
            <img src="images/contained1.jpg" alt="" class="img-fluid" />
          </div>
          <div class="item">
            <img src="images/contained2.jpg" alt="" class="img-fluid" />
          </div>
        </div>
        <!-- /Carousel -->
      </div>
    </div>
    <h3>This is a show page about</h3>
    <h1>{{ game.name }}</h1>
    <img v-bind:src="`${game.boxart}`" alt="" />
    <p>Number of players: {{ game.num_of_players }}</p>
    <p>Duration: {{ game.duration }}</p>
    <p>Difficulty (Minimum Age): {{ game.difficulty }}</p>
    <button v-on:click="deleteGame(game)">Remove this game from my collection</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      game: {},
    };
  },
  created: function() {
    axios.get("api/games/" + this.$route.params.id).then(response => {
      this.game = response.data;
      console.log("show me the game!", response.data);
    });
  },
  methods: {
    deleteGame: function() {
      axios.delete("api/game_ownerships/" + this.game.ownership.id).then(response => {
        console.log("Game deleted", response.data);
        this.$router.push("/profile");
      });
    },
  },
};
</script>
