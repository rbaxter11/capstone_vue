<template>
  <div class="home">
    <h1>{{ message }}</h1>
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
    };
  },
  created: function() {

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
  },
};
</script>
