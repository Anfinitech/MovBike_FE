<template>
  <div class="general-container" v-if="loaded">
    <div class="form-container">
      <div class="title"><h1>Actualizar Usuario</h1></div>
      <form
        name="form"
        id="form"
        method="post"
        enctype="multipart/form-data"
        v-on:submit.prevent="actualizar()"
      >
        <div class="form-group">
          <p>Alias:</p>
          <input
            type="text"
            name="u_alias"
            v-bind:placeholder="updateUser.username"
            class="form-control"
            v-model="updateUser.username"
          />
        </div>
        <div class="form-group">
          <p>Nueva Contraseña:</p>
          <input
            type="password"
            name="u_password"
            placeholder="Password"
            class="form-control"
            v-model="updateUser.password"
          />
        </div>
        <div class="form-group">
          <p>Nombre:</p>
          <input
            type="text"
            name="u_nombre"
            placeholder="Nombre"
            class="form-control"
            v-model="updateUser.name"
          />
        </div>
        <div class="form-group">
          <p>Correo Electrónico:</p>
          <input
            type="email"
            name="u_email"
            class="form-control"
            v-model="updateUser.email"
          />
        </div>
        <div class="form-group">
          <p>Rol:</p>
          <select name="rol" id="rol" v-model="updateUser.rol">
            <option value="Admin" selected>Administrador</option>
          </select>
        </div>
        <br />
        <div class="botones">
          <button class="boton_back" v-on:click.self.prevent="renderUsersTable">
            <fa icon="undo" class="back" />Volver
          </button>
          <button class="boton_up">
            <fa icon="edit" class="edit" />Actualizar
          </button>
        </div>
      </form>
    </div>
    <div class="image-container">
      <p class="caja">
        Haciendo seguimiento continuo a cada nodo para mejorar nuestro servicio
        y la experiencia de usuario.
      </p>
    </div>
  </div>
</template>


<script>
import axios from "axios"

export default {
  name: "DeleteUser",
  data() {
    return {
      updateUser: {
        name: "",
        username: "",
        password: "",
        email: "",
        rol: "Admin",
      },
      loaded: false
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
          this.updateUser = response.data;
          this.loaded=true;
          
        })
        .catch((error) => {
          console.log(error.response);
        });

    },

    updateUser: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      let token = localStorage.getItem("token");

      axios
        .patch(
          url + "/bicicletas/" + this.bicicleta.id + "/",
          this.updateBike,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        )
        .then((result) => {
          alert(
            "Bicicleta ID: " +
              result.data.id +
              " Ha sido modificada con estado: " +
              result.data.condicion +
              " Y estacion: " +
              result.data.estacion_nombre
          );
          console.log(result.data);
          this.bicicleta = result.data;
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
  height: 45em;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-image: url("../../assets/stations/UpdateBike2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
}
.form-container {
  color: #5046af;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1.5rem;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.822);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  margin: 20px;
  align-items: center;
  margin-left: 5%;
  box-shadow: 0 0 10px rgb(103, 0, 124);
}
.image-container {
  width: 55%;
  box-sizing: border-box;
  align-items: center;
  background-color: transparent;
}

/*------------Formulario------------*/
form {
  padding-left: 30px;
  font-size: 18px;
  margin-right: 10%;
  border: none;
  text-align: left;
  font-weight: 600;
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  margin-left: 10px;
  color: #0081cf;
}

.form-group input {
  margin-left: 10px;
  margin-bottom: 10px;
}

.form-group select {
  border: #5046af solid 2px;
  border-radius: 10px;
}

.form-control {
  width: 200px;
}
.rad {
  font-size: 15px;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  padding: 10px 24px;
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

.back {
  margin-right: 5px;
}

.edit {
  margin-right: 5px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
  width: 400px;
  margin-left: 10%;
  margin-top: 60px;
  overflow: hidden;
  color: #f2fcff;
}

@media only screen and (max-width: 950px) {
  .caja {
    font-family: sans-serif;
    font-weight: 600;
    font-size: 20px;
    font-style: italic;
    width: 200px;
    margin-top: 60px;
    overflow: hidden;
    color: #f2fcff;
  }

  .botones {
    flex-direction: column;
  }
}

@media only screen and (max-width: 650px) {
  .image-container {
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