<template>
  <div class="general-container">
    <div class="title-container">
      <button class="btn-register" v-on:submit.prevent="this.$emit('createButton');"> Registrar Bicicleta</button>
    </div>
    <div class="filtroPorCondicion">
      <select v-model="filtroPorCondicion">
        <option value="">N/A</option>
        <option value="En buen estado">En buen estado</option>
        <option value="Averiada">Averiada</option>
      </select>
    </div>
    <table class="table-bikes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Condición</th>
          <th>Ubicación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bicicleta in filterBikeListByCondition" :key="bicicleta.b_id">
          <td>{{ bicicleta.id }}</td>
          <td>{{ bicicleta.condicion }}</td>
          <td>{{ bicicleta.estacion_nombre }}</td>
          <td><button class="btn-detail">Ver</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Bikes",

  data() {
    return {
      bicicletas: [],
      checkedNames: [],
      filtroPorCondicion: ''
    };
  },

  methods: {
    renderBikes: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      axios
        .get(url + "/bicicletas/")
        .then((response) => {
          this.bicicletas = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    },

    loadCreateBikes: function () {
      try {
        this.$router.push({ name: "createBikes" });
      } catch (error) {
        console.log(error.response);
      }
    },

    loadDeleteBikes: function (bike) {
      try {
        localStorage.setItem("ObjBorrarBici", bike.id);
        this.$router.push({ name: "deleteBikes" });
      } catch (error) {
        console.log(error.response);
      }
    },

    loadUpdateBikes: function (bike) {
      try {
        localStorage.setItem("ObjUpdateBici", bike.id);
        this.$router.push({ name: "updateBikes" });
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  computed: {
    filterBikeListByCondition() {
      return this.bicicletas.filter(bicicleta => {
        /* console.log(bicicleta) */
        return !bicicleta.condicion.indexOf(this.filtroPorCondicion);
      })
    }
  },


  created() {
    try {
      this.renderBikes();
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

.table-bikes {
  margin-right: 0px;
  margin-left: 0px;
}

th {
  background-color: #8819ff;
  color: white;
  text-align: center;
  padding: 3px 40px 3px 40px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

td {
  text-align: center;
}
</style>