<template>
  <div class="general-container" v-if="loaded">
    <div class="title-container">
      <div class="title"><h1>Usuarios</h1></div>
    </div>
    <div class="filtroPorCondicion">
      <button class="btn-register" v-on:click.self.prevent="renderCreate">
        Registrar Usuario
      </button>
    </div>
    <table class="table-users">
      <thead>
        <tr>
          <th>ID</th>
          <th>Alias</th>
          <th>Nombre</th>
          <th>Correo Electrónico</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersTable",

  data() {
    return {
      usersList: [],
      loaded: false,
    };
  },

  methods: {
    getAllUsers: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .get(url + "/users/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.usersList = response.data;
          console.log(response.data);
          this.loaded = true;
        })
        .catch((error) => {
          console.log("error " + error);
          if (error.response.status == "401") {
            this.accessDenied();
          }
        });
    },

    renderCreate: function () {
      this.$emit("loadcomponent", "CreateUser");
    },

    verifyToken: async function () {
      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        this.accessDenied();
        return;
      }

      return axios
        .post(
          "https://move-and-flow-be.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("tokenRefresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("tokenAccess", result.data.access);
        })
        .catch((error) => {
          this.accessDenied();
        });
    },
    accessDenied: function () {
      localStorage.clear();
      alert("Acceso Denegado. Vuelve a iniciar sesión.");
      this.$router.push({ name: "Login" });
    },
  },

  created: async function () {
    try {
      this.getAllUsers();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
:root {
  --main-color: #5046af;
  --text-grey: #8390a2;
  --white: #fff;
}

.general-container {
  padding: 10px;
  margin-top: 20px;
  margin-left: 100px;
  margin-right: 100px;
  background-color: var(--white);
  border-radius: 20px;
}
.title-container {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 15px;
  margin-top: 20px;
}

.btn-register {
  position: relative;
  margin: 3px 50px 5px;
  padding: 10px 15px;
  text-decoration: none;
  background-color: var(--main-color);
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  box-shadow: 0 0 10px rgb(121, 121, 121);
  cursor: pointer;
  transition: 0.3s;
}

.btn-register:hover {
  background-color: var(--white);
  color: var(--main-color);
}

.filtroPorCondicion {
  display: flex;
  align-items: center;
  justify-content: center;
  position: initial;
  padding-bottom: 30px;
  margin-top: 0px;
}

.filtroPorCondicion h4 {
  padding-right: 5px;
  color: var(--main-color);
}

.filtroPorCondicion select {
  border-radius: 7px;
  cursor: pointer;
  border: #5046af solid 2px;
  text-decoration: none;
  justify-content: space-between;
}

.filtroPorCondicion select option:hover {
  background-color: #6ee1ff !important;
}

.btn-detail {
  padding: 10px 10px;
  position: relative;
  margin: 3px 0px 5px;
  text-decoration: none;
  background-color: #0081cf;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
}

.btn-detail:hover {
  background-color: var(--white);
  color: #0081cf;
}

h1 {
  text-align: center;
}

.table-users {
  margin-right: 0px;
  margin-left: 0px;
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: var(--main-color);
  color: white;
  text-align: center;
  width: 100%;
}

thead tr:first-child:hover {
  background-color: var(--main-color);
}

th:first-child {
  border-top-left-radius: 7px;
}

th:last-child {
  border-top-right-radius: 7px;
}

tr:hover {
  background-color: #6ee1ff;
  font-weight: 700;
  transition: 0.5s;
}

tr:nth-child(even) {
  background-color: #e3f9ff;
}

tr:nth-child(even):hover {
  background-color: #6ee1ff;
}

td {
  text-align: center;
  padding: 6px;
}

@media only screen and (max-width: 950px) {
  .title-container {
    display: flex;
    justify-content: center !important;
    padding-bottom: 30px;
    margin-top: 20px;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .title-container .title {
    display: flex;
    justify-content: center !important;
    padding-bottom: 30px;
    margin-top: 20px;
    flex-direction: column;
    text-align: center;
  }

  .title-container .btn-register {
    position: relative;
    text-decoration: none;
    background-color: var(--main-color);
    border: none;
    border-radius: 7px;
    font-weight: 600;
    color: var(--white);
    box-shadow: 0 0 10px rgb(121, 121, 121);
    cursor: pointer;
    width: 50%;
    padding: 15px 0;
    transition: 0.3s;
  }

  .table-users thead {
    background-color: var(--main-color);
    color: white;
    text-align: center;
  }
}

@media only screen and (max-width: 670px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: var(--white);
    border-radius: 20px;
  }
}
</style>