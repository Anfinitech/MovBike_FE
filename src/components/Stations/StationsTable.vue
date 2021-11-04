<template>
  <div class="general-container" v-if="loaded">
    <div class="title-container">
      <div class="title"><h1>Estaciones</h1></div>
    </div>
    <div class="filtros">
      <h4>Filtro por estado:</h4>
      <select v-model="filterByState">
        <option value="">Todas</option>
        <option value="Abierta">Abierta</option>
        <option value="Cerrada">Cerrada</option>
      </select>
      <button class="btn-register" v-on:click.self.prevent="renderCreate">
        Registrar Estación
      </button>
    </div>
    <table class="table-stations">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Capacidad</th>
          <th>Ocupación</th>
          <th>Bicis D</th>
          <th>Bicis ND</th>
          <th>Bicis T</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in filterStationsByState" :key="station.e_id">
          <td data-label="ID:">{{ station.e_id }}</td>
          <td data-label="Nombre:">{{ station.e_nombre }}</td>
          <td data-label="Estado:">{{ station.e_estado }}</td>
          <td data-label="Capacidad:">{{ station.e_capacidad }}</td>
          <td data-label="Ocupación:">
            {{
              Number(station.e_ocupacion * 100)
                .toFixed(2)
                .concat("%")
            }}
          </td>
          <td data-label="Bicis. Disponibles:">{{ station.e_bicicletasD }}</td>
          <td data-label="Bicis. No disponibles:">
            {{ station.e_bicicletasND }}
          </td>
          <td data-label="Bicis. Totales:">{{ station.e_bicicletasT }}</td>
          <td>
            <button
              class="btn-detail"
              v-on:click.self.prevent="renderUpdate(station.e_id)"
            >
              <fa
                icon="edit"
                class="icon"
                v-on:click.self.prevent="renderUpdate(station.e_id)"
              />
              <h6 v-on:click.self.prevent="renderUpdate(station.e_id)">
                Editar
              </h6></button
            ><button
              class="btn-delete"
              v-on:click.self.prevent="renderDelete(station.e_id)"
            >
              <fa
                icon="trash"
                class="icon"
                v-on:click.self.prevent="renderDelete(station.e_id)"
              />
              <h6 v-on:click.self.prevent="renderDelete(station.e_id)">
                Eliminar
              </h6>
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
  name: "StationsTable",
  data: function () {
    return {
      station: {
        e_id: 0,
        e_nombre: "",
        e_estado: "",
        e_capacidad: 0,
        e_ocupacion: 0,
        e_bicicletasD: 0,
        e_bicicletasND: 0,
        e_bicicletasT: 0,
      },
      listStations: [],
      filterByState: "",
      loaded: false,
    };
  },

  methods: {
    getAllStations: async function () {
      await this.verifyToken();

      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        return;
      }

      axios
        .get("https://move-and-flow-be.herokuapp.com/estaciones/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.listStations = response.data;
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
      this.$emit("loadcomponent", "CreateStation");
    },
    renderUpdate: function (id) {
      localStorage.setItem("StationIdToUpdate", id);
      this.$emit("loadcomponent", "UpdateStation");
    },
    renderDelete: function (id) {
      localStorage.setItem("StationIdToDelete", id);
      this.$emit("loadcomponent", "DeleteStation");
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
    filterStationsByState() {
      return this.listStations.filter((estacion) => {
        return !estacion.e_estado.indexOf(this.filterByState);
      });
    },
  },

  created: async function () {
    try {
      this.getAllStations();
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

.table-stations {
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
  background-color: #c4f0fc;
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

@media only screen and (max-width: 960px) {
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

  .table-stations thead {
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

@media only screen and (max-width: 750px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
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

  .table-stations thead {
    display: none;
  }

  .table-stations tbody,
  .table-stations tr,
  .table-stations td {
    display: block;
    width: 100%;
    border: 1px solid var(--main-color);
  }

  .table-stations tr {
    margin-bottom: 15px;
  }

  .table-stations tbody tr td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .table-stations td:before {
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