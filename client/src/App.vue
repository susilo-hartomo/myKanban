<template>
  <div>
    <!-- Is Logout -->
    <div v-if="longgedOut">
      <!-- form login -->
      <loginForm v-if="currentPage == 'login'" @currentPage="ubahKeregister" @isLogin="ubahLogin"></loginForm>

      <!-- form registr -->
      <registerForm
        v-if="currentPage == 'register'"
        @currentPage="ubahKelogin"
        @isLogin="ubahLogin"
      ></registerForm>
    </div>

    <!-- Is login -->
    <div
      v-else
      style="width: inherit; height: 100%; background-color: blueviolet; background-size: cover;
            background-position: top center;"
    >
      <nav
        class="navbar navbar-expand-sm navbar-dark fixed-top"
        style="background-color: blueviolet; height: 70px;"
      >
        <div class="container">
          <a class="navbar-brand text-primary">
            <strong>Kanban</strong>
          </a>
          <div class="text-primary">Selamat datang {{username}}</div>
          <div class="float-left">
            <button class="btn btn-primary" type="button" @click.prevent="ubahKelogout">Logout</button>
          </div>
        </div>
      </nav>

      <main class>
        <div class="nav-top"></div>
        <!-- looping bors list -->
        <div class="board-menu mr-2 ml-0" style="min-height: -webkit-fill-available;">
          <boardKanban
            v-for="(category, index) in categories"
            :key="index"
            :category="category"
            :datas="datas"
            @panggilData="getDatas"
          ></boardKanban>
        </div>
      </main>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import loginForm from "./components/loginForm.vue";
import registerForm from "./components/registerForm";
import boardKanban from "./components/boardKanban";

export default {
  data() {
    return {
      username: "",
      longgedOut: true,
      currentPage: "login",
      addTask: true,
      categories: ["backlog", "todo", "done", "completed"],
      datas: []
    };
  },
  components: {
    loginForm,
    registerForm,
    boardKanban
  },
  methods: {
    ubahKelogin(pesan) {
      return (this.currentPage = pesan);
    },
    ubahKelogout() {
      localStorage.clear();
      this.longgedOut = true;
    },
    ubahKeregister(pesan) {
      return (this.currentPage = pesan);
    },
    ubahLogin(kondisi) {
      this.getDatas()
      return (this.longgedOut = kondisi);
    },
    getDatas() {
      axios({
        method: "get",
        url: "https://infinite-oasis-77229.herokuapp.com/kanban",
        headers: { access_token: localStorage.access_token }
      })
        .then(response => {
          console.log("response: get data ", response.data);
          this.username = localStorage.username;
          this.datas = response.data;
        })
        .catch(err => {
          swal("Sorry Error server", {
            icon: "info",
            button: false,
            timer: 2000
          });
          console.log(err);
        });
    }
  },

  created() {
    if (!localStorage.access_token) {
      this.longgedOut = true;
    } else {
      this.longgedOut = false;
      this.getDatas();
    }
  }
};
</script>

<style scoped>
</style>