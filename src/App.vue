<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Board Game App</a>
  <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span> -->
  <!-- </button> -->
  <!-- <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> -->
    <div class="navbar-nav">
        <a class="nav-link active" href="/profile">
          My Collection
          <span class="sr-only">(current)</span>
        </a>
      <a class="nav-link active" href="/games">Game Database</a>
      <a class="nav-link active" href="/signup">Signup</a>
      <a class="nav-link active" href="/login">Login</a>
      <a class="nav-link active" href="/logout">Logout</a>
    </div>
  <!-- </div> -->
</nav>
    <router-view />
  </div>
</template>

<style>


nav {
  font-family: Cambria, Georgia, serif;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
}
img {
  width: 200px;
  height: 200px;
}

button {
  font-family: Cambria, Georgia, serif;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
} 
h1 {
  font-family: Cambria, Georgia, serif;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
}
h2 {
  font-family: Cambria, Georgia, serif;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
}
h3 {
  font-family: Cambria, Georgia, serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 15.4px;
}
h5 {
  font-family: Cambria, Georgia, serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 15.4px;
}
h6 {
  font-family: Cambria, Georgia, serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 15.4px;
}
p {
  font-family: Cambria, Georgia, serif;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
blockquote {
  font-family: Cambria, Georgia, serif;
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 30px;
}
pre {
  font-family: Cambria, Georgia, serif;
  font-size: 13px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 18.5714px;
}
</style>
