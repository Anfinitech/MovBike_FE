<template>
  <div class="general-container">
    <div class="form-container">
      <div class="general-title"><h1>Registrar Estación</h1></div>
      <form name="form" id="form" v-on:submit.prevent="createStation()">
        <p>
          Nombre:
          <input
            type="text"
            name="e_nombre"
            class="form-control"
            v-model="nuevaEstacion.e_nombre"
            required
          />
        </p>
        <p class="sub-title">
          Capacidad:
          <input
            type="number"
            name="e_capacidad"
            placeholder="Capacidad"
            class="form-control"
            v-model="nuevaEstacion.e_capacidad"
            required
          />
        </p>
        <p class="sub-title">Estado:</p>
        <input
          type="radio"
          name="estado"
          id="abierta"
          value="true"
          v-model="nuevaEstacion.e_estado"
        />
        <label class="rad" for="abierta">Abierta</label>
        <br />
        <input
          type="radio"
          name="estado"
          id="cerrada"
          value="false"
          v-model="nuevaEstacion.e_estado"
        />
        <label class="rad" for="cerrada">Cerrada</label>

        <br />
        <div class="botones">
          <button class="boton_register" type="submit">
            <fa icon="clipboard" class="icon" />Registrar
          </button>
          <button class="boton_back" v-on:click="renderStationsTable">
            <fa icon="undo" class="icon" />Volver
          </button>
        </div>
      </form>
    </div>
    <div class="info-container">
      <p class="caja">
        Construyendo un nodo de bienestar para nuestra comunidad.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateStation",
  data() {
    return {
      nuevaEstacion: {
        e_nombre: "",
        e_estado: false,
        e_capacidad: 90,
      },
    };
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },
    createStation: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/estaciones/", this.nuevaEstacion, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            this.accessDenied();
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
      alert("Acceso Denegado. Vuelva a iniciar sesión.");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>


<style scoped>
.general-container {
  height: 35em;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-image: url("../../assets/stations/RegisterStations2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.general-title {
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
  width: 55%;
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
  margin-top: 15px;
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

.icon {
  margin-right: 5px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
  width: 200px;
  margin-left: 10%;
  margin-top: 40px;
  overflow: hidden;
  color: #f2fcff;
  text-align: left;
}
/*--------------Imagen-------------*/
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


