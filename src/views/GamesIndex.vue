<template>
  <div class="about">
    <div class=" pt90 pb60">
      <div class="container">
        <div class="title-heading1 mb40">
          <h3>Game Database</h3>
          <br />
          <p>
            Scroll through our entire listing of games, or search below!
            <br />
            Thanks to BoardGameAtlas.com for their board game data!
          </p>
          <h3>
            Search:
            <input placeholder="search here!" v-model="nameFilter" />
          </h3>
          <p>Don't see your game listed? Feel free to add it to our database!</p>
          <a v-on:click="createGameForm()" class="btn btn-outline-secondary">Add a game to the Database</a>
          <dialog id="game-details">
           
          </dialog>
        </div>
        <div class="card-columns">
          <div
            class="col-sm-4 mb30 wow fadeInUp"
            style="max-width: 40vh; max-height: relative; object-fit: contain; overflow: hidden;"
            v-for="game in filterBy(games, nameFilter, 'name')"
            :key="game.id"
          >
            <img
              v-bind:to="`/games/${game.id}`"
              class="card-img-top img-fluid"
              v-bind:src="`${game.boxart}`"
              alt="Card image cap"
            />
            <div class="card-body">
              <router-link v-bind:to="`/games/${game.id}`">
                <h4 class="card-title">
                  {{ game.name }}
                </h4>
              </router-link>
              <!-- <div class="col-lg-3 col-md-6 mb40"> -->
              <!-- Small modal -->
              <button
                v-on:click="addGame(game)"
                type="button"
                class="btn btn-info btn-sm mb5"
                data-toggle="modal"
                data-target=".bd-example-modal-sm"
              >
                Add to Collection
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
                      <h5 class="modal-title" id="exampleModalLongTitle">Game added to collection!</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--modal-->
              <!-- </div> -->
            </div>
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

<div class="card-group">
          <div
            class="col-sm-4 mb30 wow fadeInUp"
            data-wow-delay=".2s"
            style="width: 50rem;"
            v-for="game in filterBy(games, nameFilter, 'name')"
            :key="game.id"
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
modal stuff
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