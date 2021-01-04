<template>
  <div class="about">
    <h1>Game Database</h1>
    <h4>Add games to your collection here!</h4>
    <h6>Or just browse games at your leisure</h6>
    <h2>
      Search by name:
      <input v-model="nameFilter">
    </h2>
    <div v-for="game in filterBy(games, nameFilter, 'name')" :key="game.id">
      <h6>{{ game.name }}</h6>
      <img v-bind:src="`${game.boxart}`" alt="">
      <button v-on:click="addGame(game)">I own this game!</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to Games Index",
      games: [],
      nameFilter: "",
    };
  },
  created: function() {
    axios.get("/api/games").then(response => {
      this.games = response.data;
      console.log("All Games:", this.games);
});
  },
  methods: {
    addGame: function(game) {
      var params = {
        game_id: game.id,
        user_id: localStorage.getItem("user_id"),
      }
      axios.post("api/game_ownerships/", params).then(response => {
        console.log("Game added to collection"), response.data;
      })
    }
  },
};
</script>

