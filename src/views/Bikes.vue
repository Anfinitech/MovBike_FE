<template>
  <div>
    <Sidebar />
    <Header />
    <main>
      <!--     <h1>Bicicletas</h1> -->

      <!--     <div class="contenedorfiltros">
        <div class="filtros">
          <h5>Estacion:</h5>
          <input
            type="checkbox"
            id="alfa"
            value="Alpha"
            v-model="checkedNames"
          />
          <label for="alfa">Alpha</label>
          <input
            type="checkbox"
            id="delta"
            value="Delta"
            v-model="checkedNames"
          />
          <label for="delta">Delta</label>
          <input
            type="checkbox"
            id="omega"
            value="Omega"
            v-model="checkedNames"
          />
          <label for="omega">Omega</label>
          <br />
          <span>Estaciones: {{ checkedNames }}</span>
        </div>
      </div> -->
  
      <div class="listadoBicicletas">
        <div
          class="bicicletas"
          v-for="bicicleta in bicicletas"
          :key="bicicleta"
        >
          <h4>{{ bicicleta.id}}</h4>
          <h4>{{ bicicleta.condicion }}</h4>
          <h4>{{ bicicleta.estación_id }}</h4>
          <h4>{{ bicicleta.estacion_nombre }}</h4>
          <div class="opciones">
            <button id="update">Actualizar</button>
            <button
              v-on:click="deleteBikes(bicicleta.id)"
              id="delete"
            >Borrar</button>
          </div>

        </div>
      </div>

      <div class="createBikes">
        <form v-on:submit.prevent="createBikes">
          <select v-model="newBike.b_condicion">
            <option selected>N/A</option>
            <option value=true>Buen estado</option>
            <option value=false>Averiada</option>
          </select>
          <br />
          <span>
            {{newBike.b_condicion}}
          </span>
          <br>
          <input
            type="number"
            v-model="newBike.b_en_estacion"
          />
          <br />
          <button type="submit">Registrar</button>
        </form>
      </div>

      <div class="updateBike">
        <form v-on:submit.prevent="updateBikes">
          <input
            type="number"
            v-model="id"
          />
          <span>
            {{id}}
          </span>
          <br />

          <select v-model="putBikes.b_condicion">
            <option selected>N/A</option>
            <option value=true>Buen estado</option>
            <option value=false>Averiada</option>
          </select>
          <br />
          <span>
            {{putBikes.b_condicion}}
          </span>
          <br>
          <input
            type="number"
            v-model="putBikes.b_en_estacion"
          />
          <br />
          <button type="submit">Actualizar</button>
        </form>
      </div>
    
    </main>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Header,
    Sidebar

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
    createBikes: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/bicicletas/", this.newBike)
        .then((result) => {
          console.log(result);
          this.renderBikes();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
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

    deleteBikes: function (id) {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      axios
        .delete(url + "/bicicletas/" + id + "/")
        .then((response) => {
          this.renderBikes();
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    },

    updateBikes: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      let vue = this;
      axios
        .patch(url + "/bicicletas/" + vue.id + "/", vue.putBikes)
        .then((result) => {
          this.renderBikes();
          console.log(result);

        })
        .catch((error) => {
          console.log(error.response);
        });

    }
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

<style scoped>
main {
  margin-top: 85px;
  margin-left: 335px;
  padding: 2rem 1.5rem;
  background: #e7e9f5;
  min-height: calc(100vh - 90px);
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

#delete:hover {
  background: red;
}
</style>