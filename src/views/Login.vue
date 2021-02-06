<template>
  <div class="login">
    <!-- Site Overlay -->
    <div class="site-overlay"></div>
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style='background-image: url("images/jumbotron.jpg")'
    >
      <div class="container">
        <div class="row pb30">
          <div class="col-lg-4 col-md-6 mr-auto ml-auto col-sm-8">
            <h3 class="text-white text-center mb30">Hey! Login!</h3>
            <form v-on:submit.prevent="submit()">
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Username" v-model="email" />
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model="password" />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-rounded btn-primary btn-block">Sign In</button>
              </div>
              <hr />
              <div class="text-center">
                <a href="signup" class="btn btn-link btn-block">No Account? Click here to sign up!</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/profile");
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>