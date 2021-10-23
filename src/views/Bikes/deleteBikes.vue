<template>
  <div>
    <Header />
    <Sidebar />
    <main>
      <h1>
        delete bikes
      </h1>
      <h4>{{ bicicleta.id}}</h4>
      <h4>{{ bicicleta.condicion }}</h4>
      <h4>{{ bicicleta.estación_id }}</h4>
      <h4>{{ bicicleta.estacion_nombre }}</h4>
      <button v-on:click="deleteBike">Confirmar</button>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

import axios from "axios";

export default {
  name: "deleteBikes",
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      bicicleta: {}
    }
  },


  methods: {
    deleteBike: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      axios
        .delete(url + "/bicicletas/" + this.bicicleta.id + "/")
        .then((response) => {
           this.$router.push({ name: "Bikes" });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  
  mounted() {
    let id = localStorage.getItem("ObjBorrarBici")
    console.log(id)
    let url = "https://open-move-and-flow-be.herokuapp.com";
    axios
      .get(url + "/bicicletas/" + id)
      .then((response) => {
        console.log(response.data);
        this.bicicleta = response.data;
      })
      .catch((error) => {
        console.log("error " + error);
      });
  },
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