<template>
  <div class="general-container">
    <div class="title-container">
      <div class="title"><h1>Bicicletas</h1></div>
    </div>
    <div class="filtroPorCondicion">
      <h4>Filtrar</h4>
      <select v-model="filtroPorCondicion">
        <option value="">Todas</option>
        <option value="En buen estado">En buen estado</option>
        <option value="Averiada">Averiada</option>
      </select>
      <button
        class="btn-register"
        v-on:submit.prevent="this.$emit('createButton')"
      >
        Registrar Bicicleta
      </button>
    </div>
    <table class="table-bikes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Condición</th>
          <th>Ubicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="bicicleta in filterBikeListByCondition"
          :key="bicicleta.b_id"
        >
          <td>{{ bicicleta.id }}</td>
          <td>{{ bicicleta.condicion }}</td>
          <td>{{ bicicleta.estacion_nombre }}</td>
          <td>
            <button class="btn-detail"><fa icon="edit" />Editar</button>
          </td>
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
      filtroPorCondicion: "",
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
      return this.bicicletas.filter((bicicleta) => {
        /* console.log(bicicleta) */
        return !bicicleta.condicion.indexOf(this.filtroPorCondicion);
      });
    },
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
  background-color: #6ee1ff;
  font-weight: 700;
  transition: 0.5s;
}

tr:nth-child(even) {
  background-color: #e3f9ff;
}

tr:nth-child(even):hover {
  background-color: #6ee1ff;
}

td {
  text-align: center;
  padding: 6px;
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
}

@media only screen and (max-width: 670px) {
  .general-container {
    padding: 10px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: var(--white);
    border-radius: 20px;
  }

  .filtroPorCondicion {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 30px;
  margin-top: 20px;
}

.btn-register{
  margin-top:15px;
}
}
</style>