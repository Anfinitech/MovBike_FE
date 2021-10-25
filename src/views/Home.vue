<template>
  <div id="app">
    <html>
      <body>
        <input type="checkbox" name="" id="nav-toggle" />
        <div class="sidebar">
          <div class="siderbar-brand">
            <img class="brand" src="../assets/home/img/mov-bike.svg" alt="" />
          </div>

          <div class="sidebar-menu">
            <ul>
              <li>
                <a href="">
                  <span class="las la-igloo"></span>
                  <span v-on:click.self.prevent="activeOption = 'Dashboard'">
                    Dashboard</span
                  >
                </a>
              </li>
              <li>
                <a href="">
                  <span class="las la-user-circle"></span>
                  <span v-on:click.self.prevent="activeOption = 'HelloWorld'">
                    Crear usuario</span
                  >
                </a>
              </li>
              <li>
                <a href="">
                  <span class="las la-industry"></span>
                  <span v-on:click.self.prevent="activeOption = 'Estaciones'">
                    Estaciones</span
                  >
                </a>
              </li>
              <li>
                <a href="">
                  <span class="las la-biking"></span>
                  <span v-on:click.self.prevent="activeOption = 'Bicicletas'">
                    Bicicletas</span
                  >
                </a>
              </li>
              <li>
                <a href="">
                  <span class="las la-power-off"></span>
                  <span v-on:click="logOut"> Cerrar sesión</span>
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
              <component :is="activeOption" />
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

import HelloWorld from "@/components/HelloWorld.vue";
import Dashboard from "@/components/Dashboard.vue";
import Bicicletas from "@/components/Bikes.vue";
import Estaciones from "@/components/Stations.vue";

export default {
  name: "Home",
  components: { HelloWorld, Dashboard, Bicicletas, Estaciones },
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      activeOption: "Dashboard",
    };
  },

  methods: {
    myalert: function () {
      alert("Holi");
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
  },
};
</script>

<style>
@import "../assets/home/style.css";
@import "../assets/home/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css";
</style>