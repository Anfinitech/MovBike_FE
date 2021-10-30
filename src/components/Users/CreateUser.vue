<template>
  <div class="general-container">
    <h1>Registrar un nuevo usuario</h1>
    <form name="form" id="form" v-on:submit.prevent="createUser()">
      <h3 class="title">Nuevo Usuario</h3>
      <br />
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
      <p>
        Username:
        <input
          type="text"
          name="u_alias"
          placeholder="Username"
          class="form-control"
          v-model="nuevoUsuario.username"
        />
      </p>
      <p>
        Password:
        <input
          type="password"
          name="u_password"
          placeholder="Password"
          class="form-control"
          v-model="nuevoUsuario.password"
        />
      </p>
      <p>
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
        <p>Rol: </p>
        <input
          type="text"
          name="u_rol"
          placeholder="Rol"
          class="form-control"
          v-model="nuevoUsuario.rol"
        />
      </div>
      <br />
      <button type="submit" class="boton">Registrar</button>
      <button class="boton" v-on:click.self.prevent="renderUsersTable">
        Volver
      </button>
    </form>
    
    <p class="caja">
      Construyendo un nodo de bienestar para nuestra comunidad.
    </p>
    <v-container fluid>
      <img src="@/assets/stations/images.jpg" alt="" />
    </v-container>
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
        rol: "",
      },
    };
  },
  methods: {
    renderUsersTable: function () {
      this.$emit("loadcomponent", "UsersTable");
    },
    createUser: function () {

    },
  },
};
</script>

<style scoped>
/*------------Formulario------------*/
form {
  width: 370px;
  padding: 30px;
  font-size: 18px;
  float: right;
  margin-right: 10%;
  border: 2px double purple;
  margin-top: 3%;
}

.form-control {
  width: 300px;
}
.rad {
  font-size: 15px;
}
.boton {
  width: 80px;
  font-size: 12px;
  height: 22px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-size: 20px;
  width: 500px;
  margin-left: 10%;
  margin-top: 30px;
  overflow: hidden;
}
/*--------------Imagen-------------*/
v-container {
  margin-left: 10%;
}
</style>


