<template>
  <link rel="stylesheet" href="@/assets/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css">
  <input
    type="checkbox"
    name=""
    id="nav-toggle"
  >
  <div class="sidebar">
    <div class="siderbar-brand">
      <img
        class="brand"
        src="@/assets/mov-bike.svg"
        alt=""
      >
    </div>

    <div class="sidebar-menu">
      <ul>
        <li>
          <fa icon="igloo" />
          <span
            class="las la-igloo"
            @click="loadHome"
          >Dashboard</span>
        </li>
        <li>
          
          <span
            class="las la-user-circle"
            v-on:click="loadUsers"
          ></span>
          <fa icon="user-circle" />
          <span>Crear usuario</span>
        </li>
        <li>
          <fa icon="industry" />
          <span
            class="las la-industry"
            @click="loadStages"
          >Estaciones</span>
        </li>
        <li>
          <fa icon="biking" />
          <span
            class="las la-biking"
            v-on:click="loadBikes"
          >Bicicletas</span>
        </li>
        <li>
          <fa icon="power-off" />
          <span
            class="las la-power-off"
            @click="logOut"
          >Cerrar sesión</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",

  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (!this.is_auth)
        this.$router.push({ name: "Login" });
      else
        this.$router.push({ name: "Dashboard" });
    },

    loadHome: function () {
      this.$router.push({ name: "Dashboard" });
    },

    loadBikes: function () {
      this.$router.push({ name: "Bikes" });
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
    activeLink: function () {
      let list = document.querySelectorAll('.sidebar-menu ul li');
      list.forEach((item) =>
        item.classList.remove('hovered'));
      this.classList.add('hovered');
      list.forEach((item) =>
        item.addEventListener('mouseover', activeLink));
    }
  },
}
</script>

<style scoped>
/*========== Barra lateral ==========*/
.sidebar {
  width: 345px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-image: linear-gradient(to right, #ac5cff 0%, #4948b1 100%);
  z-index: 100;
  transition: width 300ms;
  box-shadow: 2px 2px 5px rgba(128, 93, 93, 0.3);
  overflow: hidden;
}

/*======= Contenedor del logo ==========*/
.sidebar-brand {
  height: 400px;
  padding: 1rem 0rem 1rem 2rem;
}

/*======= Logo ==========*/
.siderbar-brand .brand {
  width: 200px;
  display: inline-block;
  padding-right: 1rem;
  margin: 20px 50px;
  transition: width 300ms;
}

/*========= Efecto hover en los items el menu lateral ==========*/
.sidebar-menu li:hover,
.sidebar-menu li.hovered {
  background: #fff;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: var(--main-color);
  border-radius: 30px 0 0 30px;
}

.sidebar-menu li:hover span,
.sidebar-menu li.hovered span {
  color: var(--main-color);
}

.sidebar-menu li:hover span::before,
.sidebar-menu li.hovered span::before {
  content: "";
  position: absolute;
  right: 0%;
  top: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--white);
  pointer-events: none;
}

.sidebar-menu li:hover span::after,
.sidebar-menu li.hovered span::after {
  content: "";
  position: absolute;
  right: 0%;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--white);
  pointer-events: none;
}

.sidebar-menu {
  margin-top: 1rem;
}

.sidebar-menu li {
  width: 100%;
  margin-bottom: 1.7rem;
  padding-left: 1rem;
  position: relative;
}

.sidebar-menu span {
  padding-left: 1rem;
  display: block;
  color: #fff;
  font-size: 1.1rem;
}

/*======= Efecto click del boton de despliegue del menú lateral =========*/

#nav-toggle:checked + .sidebar {
  width: 70px;
}

#nav-toggle:checked + .sidebar .brand:last-child {
  width: 60px;
  margin: 20px 5px 0 10px !important;
}

#nav-toggle:checked + .sidebar li {
  padding-left: 1rem;
  text-align: center;
}

#nav-toggle:checked + .sidebar li span {
  font-size: 1.8rem;
  padding-left: 0rem;
  padding-right: 1rem;
}

#nav-toggle:checked + .sidebar li span:last-child {
  display: none;
}

#nav-toggle:checked ~ .main-container {
  margin-left: 70px;
}

#nav-toggle:checked ~ .main-container header {
  width: calc(100% - 70px);
  left: 70px;
}
</style>