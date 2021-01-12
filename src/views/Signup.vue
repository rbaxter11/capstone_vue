<template>
  <div class="signup">
    <div
      class="bg-parallax parallax-overlay accounts-page"
      data-jarallax='{"speed": 0.2}'
      style='background-image: url("images/jumbo4.jpg")'
    >
      <div class="container">
        <div class="row pb30 align-items-end">
          <div class="col-lg-4 ml-md-auto col-md-6 col-sm-6 mb20">
            <h3 class="text-white text-left mb30">Join the overBoard Community!</h3>
            <form v-on:submit.prevent="submit()">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Username" v-model="username" />
              </div>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Email" v-model="email" />
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model="password" />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model="passwordConfirmation"
                />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-rounded btn-primary btn-block">Sign Up</button>
              </div>
              <div class="text-center text-white-gray">Already have an account? Log In below</div>
              <hr />
              <div>
                <a href="login" class="btn btn-white-outline btn-block">Log In</a>
              </div>
            </form>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 mb20">
            
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
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" :key="error.id">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>