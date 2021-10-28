<template>
  <div id="app">
    <html>
      <body>
        <input type="checkbox" name="" id="nav-toggle" />
        <div class="sidebar">
          <div class="siderbar-brand">
            <img class="brand" src="../assets/home/img/mov-bike.svg" alt=""  @click.self.prevent="loadDashboard()"/>
          </div>

          <div class="sidebar-menu">
            <ul>
              <li>
                <a href="" v-on:click.self.prevent="loadDashboard()">
                  <span class="las la-igloo"></span>
                  <span v-on:click.self.prevent="loadDashboard()"> Dashboard</span>
                </a>
              </li>
              <li>
                <a href="" v-on:click.self.prevent="loadUsers()">
                  <span class="las la-user-circle"></span>
                  <span v-on:click.self.prevent="loadUsers()"> Usuarios [Beta]</span>
                </a>
              </li>
              <li>
                <a href="" v-on:click.self.prevent="loadStations()">
                  <span class="las la-industry"></span>
                  <span v-on:click.self.prevent="loadStations()"> Estaciones</span>
                </a>
              </li>
              <li>
                <a href="" v-on:click.self.prevent="loadBikes()">
                  <span class="las la-biking"></span>
                  <span v-on:click.self.prevent="loadBikes()"> Bicicletas</span>
                </a>
              </li>
              <li>
                <a href="" v-on:click.self="logOut">
                  <span class="las la-power-off"></span>
                  <span v-on:click.self="logOut"> Cerrar sesión</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-container">
          <header>
            <h1>
              <label for="nav-toggle">
                <span class="las la-bars"></span>
              </label>
            </h1>
            <div class="user-wrapper">
              <img
                src="../assets/home/img/avatar.jpg"
                width="50px"
                height="50px"
                alt=""
              />
              <div>
                <h4>{{ username }}</h4>
                <small>Super admin</small>
              </div>
            </div>
          </header>
          <div>
            <main>
              <router-view />
            </main>
          </div>
        </div>
      </body>
    </html>
  </div>
</template>

<script>
//Añadir efecto hovered para dejar en selección un item
let list = document.querySelectorAll(".sidebar-menu ul li");
function activeLink() {
  list.forEach((item) => item.classList.remove("hovered"));
  this.classList.add("hovered");
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));

export default {
  name: "Home",
  components: {},
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
    };
  },

  methods: {
    loadDashboard: function () {
      this.$router.push({ name: "Dashboard" });
    },
    loadUsers: function () {
      this.$router.push({ name: "Users" });
    },
    loadStations: function () {
      this.$router.push({ name: "Stations" });
    },
    loadBikes: function () {
      this.$router.push({ name: "Bikes" });
    },

    logOut: function () {
      localStorage.clear();
    },
  },
};
</script>

<style>
@import "../assets/home/style.css";
@import "../assets/home/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css";
</style>