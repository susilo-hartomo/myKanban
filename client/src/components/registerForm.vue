<template>
  <div
    class="page-header header-filter"
    style="background-color: blueviolet; background-size: cover; background-position: top center;"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 ml-auto mr-auto">
          <div class="card card-login">
            <form class="form" @submit.prevent="register">
              <div class="card-header card-header-primary text-center" style="min-height: 150px">
                <h4 class="card-title">Register</h4>
              </div>
              <div class="card-body">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">person</i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name..."
                    v-model="username"
                  />
                </div>
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
                    v-model="emailReg"
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
                    v-model="passwordReg"
                  />
                </div>
              </div>
              <div class="mt-4">
                <div class="description text-center">
                  Have account
                  <a href class="text-dark ml-2" @click.prevent="$emit('currentPage', 'login')">
                    Login
                    Now!
                  </a>
                </div>
              </div>
              <div class="footer text-center mb-0" style="width: 95%;">
                <button class="btn btn-primary m-3" style="width: inherit;" type="submit">Register</button>
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
  data() {
    return {
      username: "",
      emailReg: "",
      passwordReg: ""
    };
  },
  methods: {
    register() {
      axios
        .post("https://infinite-oasis-77229.herokuapp.com/user/register", {
          username: this.username,
          email: this.emailReg,
          password: this.passwordReg
        })
        .then((response) => {
           swal(`Welcome to Kanban App : \n  ${response.data.username}`, {
            icon: "success",
            button: false,
            timer: 2000
          });
          console.log('response: ', response.data);
          localStorage.setItem('access_token', response.data.access_token)
          this.$emit('isLogin', false)
        })
        .catch(function(error) {
           swal("Error regiter, please Register again!", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>