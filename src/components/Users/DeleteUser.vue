<template>
    <div class="general-container">
      <div class="p-container">
        <div class="general-title">
          <h1>Eliminar usuario</h1>
        </div>
        <div class="prevention">
          <p>¿Esta seguro de eliminar la siguiente información?</p>
        </div>
        <div class="group">
          <p class="sub-title">ID: {{deleteUser.id}} </p>
          <p class="sub-title">Alias: {{deleteUser.username}}</p>
          <p class="sub-title">Nombre: {{deleteUser.name}} </p>
          <p class="sub-title">Correo Electrónico: {{deleteUser.email}} </p>
          <p class="sub-title">Rol:{{deleteUser.role}} </p>
        </div>
        <br />
        <div class="botones">
          <button
            class="boton_delete"
            v-on:click="deleteUsers"
          >
            <fa
              icon="trash"
              class="icon"
            />Eliminar
          </button>
          <button
            class="boton_back"
            v-on:click.self.prevent="renderUsersTable"
          >
            <fa
              icon="undo"
              class="icon"
            />Volver
          </button>
        </div>
      </div>
    </div>
</template>
<script>

import axios from "axios";

export default {
  name: "DeleteUser",

  data() {
    return {
      deleteUser: {}
    }
  },

  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },

    deleteUsers: function () {
      let url = "https://move-and-flow-be.herokuapp.com";
      let id = localStorage.getItem("idUserToDelete");
      axios
        .delete(url + "/users/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data);
          this.$emit("loadcomponent", "UsersTable");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getData: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let id = localStorage.getItem("idUserToDelete");
      console.log(id);
      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .get(url + "/users/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log("Inside Users");
          console.log(response.data);
          this.deleteUser = response.data;
          console.log(this.deleteUser)
          this.loaded = true;

        })
        .catch((error) => {
          console.log(error.response);
        });
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
    await this.getData();
  },

};
</script>

<style scoped>
.general-container {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-image: url("../../assets/stations/DeleteStations.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1rem;
}

.general-title {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
}

.p-container {
  color: #5046af;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 1rem 1.5rem;
  width: 410px;
  background-color: rgba(233, 233, 233, 0.918);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin: 20px;
  box-shadow: 0 0 10px rgb(190, 190, 190);
}

.prevention {
  text-align: center;
  margin-bottom: 15px;
}

.prevention p {
  color: crimson;
  font-weight: 600;
}

.group .sub-title {
  color: #5046af;
  font-weight: 600;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
}

.boton_delete {
  padding: 10px 10px;
  position: relative;
  margin: 3px 5px 5px;
  text-decoration: none;
  background-color: crimson;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
  display: inline;
}

.boton_back {
  padding: 10px 10px;
  position: relative;
  margin: 3px 0px 5px;
  text-decoration: none;
  background-color: #00c2a8;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
}

.boton_back:hover {
  background-color: var(--white);
  color: #00c2a8;
}

.boton_delete:hover {
  background-color: var(--white);
  color: crimson;
}

.icon {
  margin-right: 5px;
}
</style>