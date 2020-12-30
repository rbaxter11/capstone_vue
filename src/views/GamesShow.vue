<template>
  <div class="about">
    <h3>This is a show page about </h3>
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
      currentGame: {},
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
      // Need to get the games_ownerships.id for the current game
      axios.delete("api/game_ownerships/" + this.ownership.id).then(response => {
        console.log("Game deleted", response.data);
        this.$router.push("/profile");
      });
    },
  },
}
</script>