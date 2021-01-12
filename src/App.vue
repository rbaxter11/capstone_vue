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
                My Profile
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
            <li class="nav-item">
              <a class="nav-link active" href="/login">
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/logout">
                Sign Out
              </a>
            </li>
          </ul>
        </div>
        <div class=" navbar-right-elements">
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="javascript:void(0)" class=" menu-btn">
                <i class="ti-shopping-cart"></i>
                <span class="badge badge-default">3</span>
              </a>
            </li>
          </ul>
        </div>
        <!--right nav icons-->
      </div>
    </nav>
    <router-view />
    <footer class="footer footer-dark pt50 pb30">
      <div class="container">
        <div class="row">
          <div class="col-lg-6  ml-auto mr-auto text-center">
            <ul class="social-icons list-inline">
              <p>overBoard is made by Ryan Baxter</p>
              <li class="list-inline-item">
                <a href="https://www.linkedin.com/in/ryanbaxter/">
                  <i class="fa fa-linkedin"></i>
                  LinkedIn
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://github.com/rbaxter11">
                  <i class="fa fa-github"></i>
                  GitHub
                </a>
              </li>
            </ul>
            <h4>
              <i class="fa fa-envelope"></i>
              RyanAndrewBaxter@gmail.com
            </h4>
            <a href="https://www.boardgameatlas.com/api/docs">
              <p>Special thanks to the Board Game Atlas API!</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
    <!--/footer-->
  </div>
</template>

<style>
body {
  background-color: #c6d0cda5;
}
</style>

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
