<template>
  <div>
    <Header />
    <Sidebar />
    <main>
      <h1>
        update bikes
      </h1>
      <div class="bicicleta">
        <h4>{{ bicicleta.id}}</h4>
        <h4>{{ bicicleta.condicion }}</h4>
        <h4>{{ bicicleta.estación_id }}</h4>
        <h4>{{ bicicleta.estacion_nombre }}</h4>
      </div>

      <div class="updateBike">
        <form v-on:submit.prevent="updateBike">
          <input
            type="number"
            v-model="idBike"
          />
          <span>
            {{idBike}}
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

import axios from "axios";

export default {
  name: "updateBikes",
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      bicicleta: {},
      putBikes: {
        b_condicion: true,
        b_en_estacion: 0
      },
      idBike: 0,
    }
  },
  methods: {
    updateBike: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      let vue = this;
      let token = localStorage.getItem("token")
      axios
        .patch(url + "/bicicletas/" + this.bicicleta.id + "/", this.putBikes, {
          headers: {
            Authorization:`bearer ${token}`
          }
        })
        .then((result) => {
          console.log(result);

        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },

  mounted() {
    let id = localStorage.getItem("ObjUpdateBici")
    console.log(id)
    let url = "https://open-move-and-flow-be.herokuapp.com";
    axios
      .get(url + "/bicicletas/" + id)
      .then((response) => {
        console.log(response.data);
        console.log("test");
        this.bicicleta = response.data;

        this.putBikes.b_condicion = this.bicicleta.condicion === 'En buen estado' ? true : false;
        this.putBikes.b_en_estacion = this.bicicleta.estación_id;
        this.idBike = this.bicicleta.id;
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }
}

</script>

<style scoped >
main {
  margin-top: 50px;
  margin-left: 335px;
  padding: 2rem 1.5rem;
  background: #e7e9f5;
  min-height: calc(100vh - 90px);
}
</style >