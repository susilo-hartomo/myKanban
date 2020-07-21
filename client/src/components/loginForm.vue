<template>
  <div
    class="page-header header-filter"
    style="background-color: blueviolet; background-size: cover; background-position: top center;"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 ml-auto mr-auto">
          <div class="card card-login">
            <form class="form" v-on:submit.prevent="login">
              <div class="card-header card-header-primary text-center" style="min-height: 200px">
                <h4 class="card-title">Login</h4>
                <div class="social-line d-flexbox center">
                  <a class="btn btn-just-icon btn-link" v-google-signin-button="clientId">
                    <i class="fa fa-google"></i>
                  </a>
                  <p>Login with Google</p>
                </div>
              </div>
              <div class="card-body">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">mail</i>
                    </span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email..."
                    v-model="emailLog"
                  />
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">lock</i>
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password..."
                    v-model="passwordLog"
                  />
                </div>
              </div>
              <div class="mt-4">
                <div class="description text-center">
                  Dont have account
                  <a
                    href
                    class="text-dark ml-2"
                    @click.prevent="$emit('currentPage','register')"
                  >
                    Register
                    Now!
                  </a>
                </div>
              </div>
              <div class="footer text-center" style="width: 95%;">
                <button class="btn btn-primary m-3" style="width: inherit;">
                  Get
                  Started
                </button>
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
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      passwordLog: "",
      emailLog: "",
      clientId:
        "966750689515-lb8p0mn7a8kk256idaj4je5pa153pj0p.apps.googleusercontent.com"
    };
  },
  methods: {
    login() {
      axios
        .post("https://infinite-oasis-77229.herokuapp.com/user/login", {
          email: this.emailLog,
          password: this.passwordLog
        })
        .then(response => {
          swal("Welcome to Kanban App \n" + response.data.username, {
            icon: "success",
            button: false,
            timer: 2000
          });
          console.log("response: ", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("isLogin", false);
        })
        .catch(function(error) {
          swal("Check your password / email again!", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(error.response);
        });
    },
    registerForm() {
      let register = "register";
      return register;
    },
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
        method: "post",
        url: "https://infinite-oasis-77229.herokuapp.com/user/login/google",
        data: {
          idToken: idToken
        }
      })
        .then(response => {
          swal(`Welcome to Kanban App : \n  ${response.data.username}`, {
            icon: "success",
            button: false,
            timer: 2000
          });
          console.log("response: ", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("isLogin", false);
        })
        .catch(function(error) {
          swal("Error regiter, please Register again!", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(error);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
</style>
