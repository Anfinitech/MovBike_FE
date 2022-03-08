<template>
  <div class="general-container" v-if="loaded">
    <div class="title-container">
      <div class="title">
        <h1>Bicicletas</h1>
      </div>
    </div>
    <div class="filtroPorCondicion">
      <h4>Filtrar</h4>
      <select v-model="filtroPorCondicion">
        <option value="">Todas</option>
        <option value="En buen estado">En buen estado</option>
        <option value="Averiada">Averiada</option>
      </select>
      <button class="btn-register" v-on:click.self.prevent="renderCreate">
        Registrar Bicicleta
      </button>
    </div>
    <table class="table-bikes">
      <thead>
        <tr>
          <th class="idColumn">ID</th>
          <th class="conditionColumn">Condición</th>
          <th class="stationColumn">Ubicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
    </table>

    <div class="scroll">
      <table class="table-bikes">
        <tbody>
          <tr
            v-for="bicicleta in filterBikeListByCondition"
            :key="bicicleta.b_id"
          >
            <td class="idColumn">{{ bicicleta.id }}</td>
            <td class="conditionColumn">{{ bicicleta.condicion }}</td>
            <td class="stationColumn">{{ bicicleta.estacion_nombre }}</td>
            <td>
              <button
                class="btn-detail"
                v-on:click.self.prevent="renderUpdate(bicicleta)"
              >
                <fa icon="edit" v-on:click="renderUpdate(bicicleta)" />
                <h6 v-on:click.self.prevent="renderUpdate(bicicleta)">
                  Editar
                </h6>
              </button>
              <button
                class="btn-delete"
                v-on:click.self.prevent="renderDelete(bicicleta)"
              >
                <fa icon="trash" v-on:click="renderDelete(bicicleta)" />
                <h6 v-on:click.self.prevent="renderDelete(bicicleta)">
                  Eliminar
                </h6>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BikesTable",

  data() {
    return {
      bicicletas: [],
      checkedNames: [],
      filtroPorCondicion: "",
      loaded: false,
    };
  },

  methods: {
    renderBikes: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      let url = "https://move-and-flow-be.herokuapp.com";
      axios
        .get(url + "/bicicletas/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.bicicletas = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == "401") {
            this.accessDenied();
          }
        });
    },

    renderCreate: function () {
      this.$emit("loadcomponent", "CreateBike");
    },
    renderUpdate: function (bike) {
      localStorage.setItem("idBikeToUpdate", bike.id);
      this.$emit("loadcomponent", "UpdateBike");
    },

    renderDelete: function (bike) {
      localStorage.setItem("idBikeToDelete", bike.id);
      this.$emit("loadcomponent", "DeleteBike");
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

  computed: {
    filterBikeListByCondition() {
      return this.bicicletas.filter((bicicleta) => {
        return !bicicleta.condicion.indexOf(this.filtroPorCondicion);
      });
    },
  },

  created: async function () {
    try {
      this.renderBikes();
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

.filtroPorCondicion {
  display: flex;
  align-items: center;
  justify-content: center;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
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

.table-bikes {
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

.scroll {
  overflow: scroll;
  height: 475px;
  width: 100%;
}

.idColumn {
  width: 5vw;
}

.conditionColumn {
  width: 15vw;
}

.stationColumn {
  width: 15vw;
}

@media only screen and (max-width: 950px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
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

  .table-bikes thead {
    background-color: var(--main-color);
    color: white;
    text-align: center;
  }

  .idColumn {
    width: 5vw;
  }

  .conditionColumn {
    width: 15vw;
  }
}

@media only screen and (max-width: 700px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    background-color: var(--white);
    border-radius: 20px;
    width: 97%;
  }

  .filtroPorCondicion {
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

  .btn-detail {
    width: 40px;
    height: 40px;
  }

  .btn-detail h6 {
    visibility: hidden;
  }

  .btn-delete {
    width: 40px;
    height: 40px;
  }

  .btn-delete h6 {
    visibility: hidden;
  }

  .idColumn {
    width: 5vw;
  }

  .conditionColumn {
    width: 15vw;
  }
}
</style>
