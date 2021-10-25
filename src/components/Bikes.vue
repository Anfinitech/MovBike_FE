<template>
  <div>
    <div class="main-container">
      <main>
        <div class="top-bar">
          <h1>BICICLETAS</h1>
          <button v-on:click="loadCreateBikes">Crear</button>
        </div>
        <div class="listadoBicicletas">
          <div
            class="bicicletas"
            v-for="bicicleta in bicicletas"
            :key="bicicleta"
          >
            <h4 class="bikesid">{{ bicicleta.id }}</h4>
            <h4>{{ bicicleta.condicion }}</h4>
            <h4>{{ bicicleta.estación_id }}</h4>
            <h4>{{ bicicleta.estacion_nombre }}</h4>
            <div class="opciones">
              <button v-on:click="loadUpdateBikes(bicicleta)">
                Actualizar
              </button>
              <button v-on:click="loadDeleteBikes(bicicleta)">Borrar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Bicicletas",

  data() {
    return {
      bicicletas: [],
      checkedNames: [],
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

  //TODO:Filtro de estaciones
  /*     computed:{
        filterBicicletas(filtro){
            return this.bicicletas.filter((bicicleta)=>{
              return bicicleta.estacion_nombre === "Alpha"; 
            }) 
        }
      }, */

  created() {
    try {
      this.renderBikes();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
.listadoBicicletas {
  width: 80%;
  height: 750px;
  border: var(--borde) solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.bicicletas {
  border: var(--borde) solid black !important;

  margin: 10px;
  padding: 5px;
  height: 50px;
  width: 80%;
  display: flex;

  align-items: center;
  justify-content: space-around;
  box-shadow: 5px 6px 8px 5px rgb(0 0 0 / 20%);
  transition: 0.3s;
}

.bicicletas h4 {
  margin: 5px;
  padding: 5px;
}

.bicicletas:hover {
  box-shadow: 0px 10px 5px 5px rgb(0 0 0 / 20%);
}
.opciones {
  width: 300px;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  border: var(--borde) solid blue;
}

#delete:hover {
  background: red;
}

.bikesid {
  width: 100px;
}

.top-bar {
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>

