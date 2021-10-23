<template>
  <div>
    <Header />
    <Sidebar />
    <main>
      <h1>BICICLETAS</h1>
      <button v-on:click="loadCreateBikes">
        Crear
      </button>
      <div class="listadoBicicletas">
        <div
          class="bicicletas"
          v-for="bicicleta in bicicletas"
          :key="bicicleta"
        >
          <h4 class="bikesid">{{ bicicleta.id}}</h4>
          <h4>{{ bicicleta.condicion }}</h4>
          <h4>{{ bicicleta.estación_id }}</h4>
          <h4>{{ bicicleta.estacion_nombre }}</h4>
          <div class="opciones">
            <button v-on:click="loadUpdateBikes(bicicleta)">Actualizar</button>
            <button v-on:click="loadDeleteBikes(bicicleta)">Borrar</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: "bicicleta",
  components: {
    Header,
    Sidebar,
  },

  data() {
    return {
      id: 0,
      putBikes: {
        b_condicion: true,
        b_en_estacion: 0
      },
      newBike: {
        b_condicion: true,
        b_en_estacion: 0
      },
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
:root {
  --main-color: #5046af;
  --text-grey: #8390a2;
  --white: #fff;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
}

.contenedorfiltros {
  width: 80%;
  margin: 10px;
  display: flex;
  justify-content: space-around;
}

.filtros {
  background-color: #283747;
  color: white;
  padding: 10px;
  border-radius: 20px;
}

.listadoBicicletas {
  margin-top: 200px;
  width: 80%;
  height: 750px;
  border: var(--borde) solid blue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
main {
  margin-top: 50px;
  margin-left: 335px;
  padding: 2rem 1.5rem;
  background: #e7e9f5;
  min-height: calc(100vh - 90px);
}
#delete:hover {
  background: red;
}

.bikesid {
  width: 100px;
}
</style>
