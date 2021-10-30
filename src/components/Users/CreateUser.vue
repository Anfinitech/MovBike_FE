<template>
  <div class="general-container">
    <div class="form-container">
    <div class="general-title"><h1>Registrar un nuevo usuario</h1></div>
    <form name="form" id="form" v-on:submit.prevent="createUser()">
      <h3 class="title">Nuevo Usuario</h3>
      <p>
        Nombre:
        <input
          type="text"
          name="u_nombre"
          placeholder="Nombre"
          class="form-control"
          v-model="nuevoUsuario.name"
        />
      </p>
      <p class="sub-title">
        Username:
        <input
          type="text"
          name="u_alias"
          placeholder="Username"
          class="form-control"
          v-model="nuevoUsuario.username"
        />
      </p>
      <p class="sub-title">
        Password:
        <input
          type="password"
          name="u_password"
          placeholder="Password"
          class="form-control"
          v-model="nuevoUsuario.password"
        />
      </p>
      <p class="sub-title">
        Email:
        <input
          type="email"
          name="u_email"
          placeholder="Email"
          class="form-control"
          v-model="nuevoUsuario.email"
        />
      </p>
      <div class="form-group">
        <p class="sub-title">Rol: </p>
        <input
          type="text"
          name="u_rol"
          placeholder="Rol"
          class="form-control"
          v-model="nuevoUsuario.rol"
        />
      </div>

      <div class="botones">
      <button type="submit" class="boton_register"><fa icon="clipboard" class="icon"/>Registrar</button>
      <button class="boton_back" v-on:click.self.prevent="renderUsersTable">
        <fa icon="undo" class="icon"/>Volver
      </button>
      </div>
    </form>
    </div>
    <div class="info-container">
    <p class="caja">
      Bienvenido a esta gran familia llamada Move Bike.
    </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateUser",
  data() {
    return {
      nuevoUsuario: {
        name: "",
        username: "",
        password: "",
        email: "",
        role: "Admin",
      },
    };
  },
  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },

    createUser: async function () {
      await this.verifyToken();
      console.log("Hola después del verify");
      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }
      console.log("Hola después del empty token");

      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/register/", this.nuevoUsuario, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          console.log("Hola dentro del then");
          alert(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Hola dentro del catch");
          console.log(error.response);

          if (error.response.status == "401") {
            /*this.accessDenied();*/
            alert(error);
          } else if (error.response.status == "400") {
            alert("BAD REQUEST [400]");
          } else {
            alert(error);
          }
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
  background-image: url("../../assets/users/CreateUsers.jpg");
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

form p{
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

form label{
  color: #0081cf;
}

form p input{
  border: #5046af solid 2px;
  border-radius: 10px;
  font-size: 18px;
  font-weight:600;
  padding-left:15px;
  margin-top:10px;
  color: #0081cf;
}

::placeholder{
  color: #93d4ff;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}

.boton_register {
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

.boton_register:hover {
  background-color: var(--white);
  color: #0081cf;
}

.icon{
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
  color: #5046af;
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


