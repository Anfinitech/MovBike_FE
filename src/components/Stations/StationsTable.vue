<template>
  <div class="general-container" v-if="loaded">
    <div class="title-container">
      <button class="btn-register" v-on:click.self.prevent="renderCreate">
        Registrar Estación
      </button>
    </div>
    <div class="filtros">
      <h3>Filtro por estado:</h3>
      <select v-model="filterByState">
        <option value="">Todas</option>
        <option value="Abierta">Abierta</option>
        <option value="Cerrada">Cerrada</option>
      </select>
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in filterStationsByState" :key="station.e_id">
          <td>{{ station.e_id }}</td>
          <td>{{ station.e_nombre }}</td>
          <td>{{ station.e_estado }}</td>
          <td>{{ station.e_capacidad }}</td>
          <td>
            {{
              Number(station.e_ocupacion * 100)
                .toFixed(2)
                .concat("%")
            }}
          </td>
          <td>{{ station.e_bicicletasD }}</td>
          <td>{{ station.e_bicicletasND }}</td>
          <td>{{ station.e_bicicletasT }}</td>
          <td>
            <button class="btn-detail" v-on:click.self.prevent="renderDetail">
              Ver más
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
      if (
        localStorage.getItem("tokenRefresh") === null ||
        localStorage.getItem("tokenAccess") === null
      ) {
        console.log("Mierda rara");
        this.accessDenied();
        return;
      }

      await this.verifyToken();

      axios
        .get("https://move-and-flow-be.herokuapp.com/estaciones/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAccess")}`,
          },
        })
        .then((response) => {
          this.listStations = response.data;
          this.loaded = true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == "401") {
            this.accessDenied();
          }
        });
    },
    renderCreate: function () {
      this.$emit("loadcomponent", "CreateStation");
    },
    renderDetail: function () {
      this.$emit("loadcomponent", "DetailStation");
    },

    verifyToken: async function () {
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

  computed: {
    filterStationsByState() {
      return this.listStations.filter((estacion) => {
        /* console.log(estacion) */
        return !estacion.e_estado.indexOf(this.filterByState);
      });
    },
  },

  created: async function () {
    try {
      console.log(localStorage.getItem("tokenRefresh"));
      console.log(localStorage.getItem("tokenAccess"));
      this.getAllStations();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: left;
  position: initial;
}

.btn-register {
  position: relative;
  margin: 3px 0px 5px;
  padding: 0px 15px;
}

.btn-detail {
  padding: 1px 25px;
}

h1 {
  text-align: center;
  margin: 0px 30px 0px 170px;
}

.table-stations {
  margin-right: auto;
  margin-left: auto;
}

th {
  background-color: #8819ff;
  color: white;
  padding: 3px 8px 3px 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

td {
  text-align: center;
}
</style>