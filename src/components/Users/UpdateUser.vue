<template>
  <div class="general-container" v-if="loaded">
    <div class="form-container">
      <div class="general-title"><h1>Actualizar Usuario</h1></div>
      <form
        name="form"
        id="form"
        method="post"
        enctype="multipart/form-data"
        v-on:submit.prevent="actualizar"
      >
        <div class="form-group">
          <p>Alias:</p>
          <input
            type="text"
            name="u_alias"
            placeholder="Username"
            class="form-control"
            v-model="nuevoUsuario.username"
          />
        </div>
        <div class="form-group">
          <p class="sub-title">Nueva Contraseña:</p>
          <input
            type="password"
            name="u_password"
            placeholder="Password"
            class="form-control"
            v-model="nuevoUsuario.password"
          />
        </div>
        <div class="form-group">
          <p class="sub-title">Nombre:</p>
          <input
            type="text"
            name="u_nombre"
            placeholder="Nombre"
            class="form-control"
            v-model="nuevoUsuario.name"
          />
        </div>
        <div class="form-group">
          <p class="sub-title">Correo Electrónico:</p>
          <input
            type="email"
            name="u_email"
            class="form-control"
            v-model="nuevoUsuario.email"
          />
        </div>
        <div class="form-group">
          <p class="sub-title">Rol:</p>
          <select name="rol" id="rol">
            <option value="Admin">Administrador</option>
          </select>
        </div>
        <div class="botones">
          <button class="boton_up" type="submit">
            <fa icon="edit" class="icon" />Actualizar
          </button>
          <button class="boton_back" v-on:click.self.prevent="renderUsersTable">
            <fa icon="undo" class="icon" v-on:click.self.prevent="renderUsersTable"/>Volver
          </button>
        </div>
      </form>
    </div>
    <div class="info-container">
      <p class="caja">MovBike. Una familia, una tendencia.</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "UpdateUser",
  data() {
    return {
      nuevoUsuario: {
        id: "",
        name: "",
        username: "",
        password: "",
        email: "",
        rol: "Admin",
      },
      loaded: false,
    };
  },

  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },

    getData: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let id = localStorage.getItem("idUserToUpdate");
      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .get(url + "/users/" + id + "/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.nuevoUsuario = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";

      axios
        .patch(
          url + "/users/" + this.nuevoUsuario.id + "/",
          this.nuevoUsuario,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
            },
          }
        )
        .then((result) => {
          alert("Actualización Exitosa");
          this.nuevoUsuario = result.data;
        })
        .catch((error) => {
          console.log(error);
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
      alert("Acceso Denegado. Vuelva a iniciar sesión.");
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
  justify-content: space-between;
  overflow: hidden;
  background-image: url("../../assets/users/UpUser.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.general-title {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 15px;
  margin-top: 20px;
}

.form-container {
  color: #5046af;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0rem 1.5rem;
  width: 410px;
  background-color: rgba(233, 233, 233, 0.623);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin: 20px;
  align-items: center;
  margin-left: 5%;
  box-shadow: 0 0 10px rgb(190, 190, 190);
}
.info-container {
  width: 50%;
  box-sizing: border-box;
  align-items: center;
  background-color: transparent;
}
/*------------Formulario------------*/
form {
  padding-left: 15px;
  font-size: 18px;
  margin-right: 10%;
  border: none;
  text-align: left;
  font-weight: 600;
}

form p {
  margin-top: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  color: #0081cf;
}

.form-group .sub-title {
  color: #5046af;
}

.form-group select {
  border: #5046af solid 2px;
  border-radius: 10px;
}

.form-group input {
  margin-bottom: 10px;
  border-radius: 10px;
  border: #5046af solid 2px;
  outline: none;
}

.rad {
  margin-left: 10px;
}

.form-control {
  width: 300px;
}
.rad {
  font-size: 15px;
}

form label {
  color: #0081cf;
}

form p input {
  border: #5046af solid 2px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  padding-left: 15px;
  margin-top: 10px;
  color: #0081cf;
}

::placeholder {
  color: #93d4ff;
  padding-left: 10px;
  font-weight: 600;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 25px;
}

.boton_up {
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

.boton_up:hover {
  background-color: var(--white);
  color: #0081cf;
}

.icon {
  margin-right: 5px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 30px;
  font-style: italic;
  width: 400px;
  margin-left: 10%;
  margin-top: 40px;
  overflow: hidden;
  color: #ffffff;
  text-align: left;
}

@media only screen and (max-width: 650px) {
  .info-container {
    display: none;
  }

  .form-container {
    width: 100%;
  }
  .botones {
    flex-direction: column;
  }
}
</style>