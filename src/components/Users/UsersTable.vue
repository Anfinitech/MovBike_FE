<template>
  <div class="general-container" v-if="loaded">
    <div class="title-container">
      <div class="title"><h1>Usuarios</h1></div>
    </div>
    <div class="filtros">
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersList" :key="user.id">
          <td data-label="ID:">{{ user.id }}</td>
          <td data-label="Usuario:">{{ user.username }}</td>
          <td data-label="Nombre:">{{ user.name }}</td>
          <td data-label="Email:">{{ user.email }}</td>
          <td data-label="Rol:">{{ user.role }}</td>
          <td>
            <button
              class="btn-detail"
              v-on:click.self.prevent="renderUpdate(user)"
            >
              <fa icon="edit" v-on:click="renderUpdate(user)" />
              <h6 v-on:click="renderUpdate(user)"> Editar</h6>
            </button>
            <button
              class="btn-delete"
              v-on:click.self.prevent="renderDelete(user)"
            >
              <fa icon="trash" v-on:click="renderDelete(user)" />
              <h6 v-on:click="renderDelete(user)"> Eliminar</h6>
            </button>
          </td>
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
          this.loaded = true;
        })
        .catch((error) => {
          if (error.response.status == "401") {
            this.accessDenied();
          } else {
            console.log(error);
          }
        });
    },

    renderCreate: function () {
      this.$emit("loadcomponent", "CreateUser");
    },

    renderUpdate: function (user) {
      localStorage.setItem("idUserToUpdate", user.id);
      this.$emit("loadcomponent", "UpdateUser");
    },

    renderDelete: function (user) {
      localStorage.setItem("idUserToDelete", user.id);
      this.$emit("loadcomponent", "DeleteUser");
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
      alert("Acceso Denegado. Vuelva a iniciar sesión.");
      this.$router.push({ name: "Login" });
    },
  },

  created: async function () {
    try {
      this.getAllUsers();
    } catch (error) {
      alert(error);
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
  background-color: var(--white);
  border-radius: 20px;
  width: 100%;
}
.title-container {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 30px;
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

.filtros {
  display: flex;
  align-items: center;
  justify-content: center;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
}

.filtros h4 {
  padding-right: 5px;
  color: var(--main-color);
}

.filtros select {
  border-radius: 7px;
  cursor: pointer;
  border: #5046af solid 2px;
  text-decoration: none;
  justify-content: space-between;
}

.filtros select option:hover {
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

.btn-detail h6 {
  font-size: 13px;
  display: inline;
  visibility: visible;
}
.btn-delete {
  padding: 10px 10px;
  position: relative;
  margin: 3px 8px 5px;
  text-decoration: none;
  background-color: #c34a36;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
  visibility: visible;
}

.btn-delete:hover {
  background-color: var(--white);
  color: #c34a36;
}

.btn-delete h6 {
  font-size: 13px;
  display: inline;
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
  background-color: #b5ecfc;
  font-weight: 700;
  transition: 0.5s;
}

tr:nth-child(even) {
  background-color: #e3f9ff;
}

tr:nth-child(even):hover {
  background-color: #b5ecfc;
}

td {
  text-align: center;
  padding: 6px;
}

.icon {
  display: inline;
  font-size: 14px;
  text-align: center;
  flex-direction: row;
  margin-right: 5px;
}

@media only screen and (max-width: 1020px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    background-color: var(--white);
    border-radius: 20px;
  }

  .title-container {
    display: flex;
    justify-content: center !important;
    margin-top: 20px;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .title-container .title {
    display: flex;
    justify-content: center !important;
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

  .btn-delete h6 {
    display: none;
    margin-right: 0;
  }

  .btn-delete .icon {
    margin-right: 0;
  }

  .btn-detail h6 {
    display: none;
    margin-right: 0;
  }

  .btn-detail .icon {
    margin-right: 0;
  }
}

@media only screen and (max-width: 820px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    background-color: var(--white);
    border-radius: 20px;
  }

  .filtros {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 30px;
    margin-top: 20px;
  }

  .btn-register {
    margin-top: 15px;
  }

  .table-users thead {
    display: none;
  }

  .table-users tbody,
  .table-users tr,
  .table-users td {
    display: block;
    width: 100%;
    border: 1px solid var(--main-color);
  }

  .table-users tr {
    margin-bottom: 15px;
  }

  .table-users tbody tr td {
    text-align: right;
    padding-left: 20%;
    position: relative;
  }

  .table-users td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: 700;
    text-align: left;
    color: var(--main-color);
  }

  .btn-detail h6 {
    font-size: 13px;
    display: inline;
    visibility: visible;
  }

  .btn-detail .icon {
    margin-right: 5px;
  }

  .btn-delete h6 {
    font-size: 13px;
    display: inline;
    visibility: visible;
  }

  .btn-delete .icon {
    margin-right: 5px;
  }
}
</style>
