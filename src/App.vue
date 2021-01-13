<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark nav-sticky">
      <div class="container">
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">
          <!-- <img class="logo logo-dark" src="images/logo.png" alt="" />
          <img class="logo logo-light hidden-md-down" src="images/logo-light.png" alt="" /> -->
          <strong>overBoard</strong>
        </a>
        <div id="navbarNavDropdown" class="navbar-collapse collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/profile">
                My Collection
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/users">
                All Collections
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/games">
                Game Database
              </a>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <a class="nav-link active" href="/signup">
                Sign Up
              </a>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <a class="nav-link active" href="/login">
                Login
              </a>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <a class="nav-link active" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
body {
  background-image: url("/images/memphis-mini.png");
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<div>
        <a class="nav-link active" href="/profile">
          My Collection
        </a> /
      <a class="nav-link active" href="/users">User Database</a> /
      <a class="nav-link active" href="/games">Game Database</a> /
      <a class="nav-link active" href="/signup">Signup</a> /
      <a class="nav-link active" href="/login">Login</a> /
      <a class="nav-link active" href="/logout">Logout</a>
    </div>
