<template>
  <div id="app">
    <html>
      <body>
        <input type="checkbox" name="" id="nav-toggle" />
        <div class="sidebar">
          <div class="siderbar-brand">
            <img
              class="brand"
              src="../assets/home/img/mov-bike.svg"
              alt=""
              @click.self.prevent="loadDashboard()"
            />
          </div>

          <div class="sidebar-menu">
            <ul>
              <li>
                <a href="" v-on:click.self.prevent="loadDashboard()">
                  <span
                    class="las la-igloo"
                    v-on:click.self.prevent="loadDashboard()"
                  ></span>
                  <span v-on:click.self.prevent="loadDashboard()">
                    Dashboard
                  </span>
                </a>
              </li>

              <li v-on:click.self.prevent="loadStations()">
                <a href="" v-on:click.self.prevent="loadStations()">
                  <span
                    class="las la-industry"
                    v-on:click.self.prevent="loadStations()"
                  ></span>
                  <span v-on:click.self.prevent="loadStations()">
                    Estaciones</span
                  >
                </a>
              </li>
              <li v-on:click.self.prevent="loadBikes()">
                <a href="" v-on:click.self.prevent="loadBikes()">
                  <span
                    class="las la-biking"
                    v-on:click.self.prevent="loadBikes()"
                  ></span>
                  <span v-on:click.self.prevent="loadBikes()"> Bicicletas</span>
                </a>
              </li>
              <li v-on:click.self.prevent="loadUsers()">
                <a href="" v-on:click.self.prevent="loadUsers()">
                  <span
                    class="las la-user-circle"
                    v-on:click.self.prevent="loadUsers()"
                  ></span>
                  <span v-on:click.self.prevent="loadUsers()"> Usuarios</span>
                </a>
              </li>
              <li v-on:click.self.prevent="loadOurTeam()">
                <a href="" v-on:click.self.prevent="loadOurTeam()">
                  <span
                    class="las la-barcode"
                    v-on:click.self.prevent="loadOurTeam()"
                  ></span>
                  <span v-on:click.self.prevent="loadOurTeam()">
                    Nuestro Equipo</span
                  >
                </a>
              </li>
              <li v-on:click.self="logOut">
                <a href="" v-on:click.self="logOut">
                  <span
                    class="las la-power-off"
                    v-on:click.self="logOut"
                  ></span>
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
                src="../assets/home/img/avatar.png"
                width="50px"
                height="50px"
                alt=""
                @click.self.prevent="loadUsers()"
              />
              <div v-on:click.self.prevent="loadUsers()">
                <h4 v-on:click.self.prevent="loadUsers()">{{ username }}</h4>
                <small v-on:click.self.prevent="loadUsers()"
                  >Administrador</small
                >
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
    loadOurTeam: function () {
      this.$router.push({ name: "OurTeam" });
    },

    logOut: function () {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
@import "../assets/home/style.css";
@import "../assets/home/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css";
</style>