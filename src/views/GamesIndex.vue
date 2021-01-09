<template>
  <div class="about">
    <div class=" pt90 pb60">
      <div class="container">
        <div class="title-heading1 mb40">
          <h3>Game Database</h3>
        </div>
        <h2>
      Search:
      <input v-model="nameFilter">
    </h2>
        <div class="card-group">
          <div
            class="col-sm-4 mb30 wow fadeInUp"
            data-wow-delay=".2s"
            style="width: 50rem;"
            v-for="game in filterBy(games, nameFilter, 'name')" :key="game.id"
          >
            <div class="entry-card">
              <router-link v-bind:to="`/games/${game.id}`">
                <a href="" class="entry-thumb">
                  <img v-bind:src="`${game.boxart}`" alt="" class="img-fluid" />
                  <span class="thumb-hover ti-back-right"></span>
                </a>
              </router-link>
              <!--/entry thumb-->
              <div class="entry-content">
                <div class="entry-meta mb5">
                  <span>
                    {{ game.name }}
                  </span>
                </div>
                <div class="text-right">
                    <a v-on:click="addGame(game)" href="" class="btn-link btn">Add to Collection</a>
                </div>
              </div>
              <!--/entry content-->
            </div>
            <!--/.col-->
          </div>
        </div>
      </div>
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
      };
      axios.post("api/game_ownerships/", params).then(response => {
        console.log("Game added to collection"), response.data;
      });
    },
  },
};
</script>

<h1>Game Database</h1>
<h4>Add games to your collection here!</h4>
<h6>Or just browse games at your leisure</h6>
<h2>
      Search by name:
      <input v-model="nameFilter">
    </h2>
<!-- <div v-for="game in filterBy(games, nameFilter, 'name')" :key="game.id">
      <h6>{{ game.name }}</h6>
      <img v-bind:src="`${game.boxart}`" alt="" />
      <button v-on:click="addGame(game)">I own this game!</button>
    </div> -->
