<template>
  <html>
    <body>
      <div class="login-container">
        <div class="image-container">
          <img class="logo" src="@/assets/login/images/mov-bike.svg" />
          <img
            class="map"
            src="@/assets/login/images/img-mov-bike.svg"
            alt=""
          />
        </div>

        <div class="login-info-container">
          <div class="tab-login">
            <h2>Bienvenido</h2>
          </div>
          <h1 class="title">Iniciar sesión</h1>

          <form class="inputs-container" v-on:submit.prevent="processLogInUser">
            <input
              class="input"
              type="text"
              placeholder="Usuario"
              v-model="user.username"
            />
            <input
              class="input"
              type="password"
              placeholder="Contraseña"
              v-model="user.password"
            />
            <button class="btn" type="submit">Iniciar sesión</button>
            <p v-on:click="forgetPassword" id="forgot"><span class="span">Olvidaste la contraseña</span></p>
          </form>
        </div>
      </div>
    </body>
  </html>
</template>


<script>
import axios from "axios";

export default {
  name: "Login",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    processLogInUser: function () {
      axios
        .post("https://move-and-flow-be.herokuapp.com/login/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            tokenAccess: result.data.access,
            tokenRefresh: result.data.refresh,
          };

          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
        });
    },

    forgetPassword: function () {
      alert("Comuniquese con el administrador del sistema, por favor.")

    }
  },
};
</script>


<style>
@import "../assets/login/style.css";
</style>