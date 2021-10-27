<template>
  <div class="general-container">
    <div class="title-container">
      <div class="title"><h1>Bicicletas</h1></div>
      <button class="btn-register" v-on:submit.prevent="this.$emit('createButton');"> Registrar Bicicleta</button>
    </div>
    <table class="table-bikes">
      <thead>
        <tr>
          <th data-label="ID">ID</th>
          <th data-label="Condición">Condición</th>
          <th data-label="Ubicación">Ubicación</th>
          <th data-label="Acciones">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bicicleta in bicicletas" :key="bicicleta.b_id">
          <td>{{ bicicleta.id }}</td>
          <td>{{ bicicleta.condicion }}</td>
          <td>{{ bicicleta.estacion_nombre }}</td>
          <td><button class="btn-detail"><fa icon="edit" />Editar</button></td>
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

<style scoped>

:root{
    --main-color: #5046AF;
    --text-grey: #8390A2 ;
    --white: #fff;
}

.general-container{
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
  margin: 3px 0px 5px;
  padding: 0px 15px;
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

.btn-register:hover{
  background-color: var(--white);
  color: var(--main-color);
}

.btn-detail {
  padding: 10px 10px;
  position: relative;
  margin: 3px 0px 5px;
  text-decoration: none;
  background-color: #0081CF;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
}

.btn-detail:hover{
  background-color: var(--white);
  color: #0081CF;
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

thead tr:first-child:hover{
   background-color: var(--main-color);
}

th:first-child{
  border-top-left-radius: 7px;
}

th:last-child{
  border-top-right-radius: 7px;
}

tr:hover{
  background-color: #6EE1FF;
  font-weight: 700;
  transition: 0.5s;
}

tr:nth-child(even) {
  background-color: #e3f9ff ;
}

tr:nth-child(even):hover {
  background-color: #6EE1FF ;
}

td {
  text-align: center;
  padding: 6px;
}

@media only screen and (max-width: 950px) {
  .title-container {
  display:flex;
  justify-content:center !important;
  padding-bottom: 30px;
  margin-top: 20px;
  flex-direction:column;
  text-align: center; 
  align-items: center;
}
.title-container .title{
  display:flex;
  justify-content:center !important;
  padding-bottom: 30px;
  margin-top: 20px;
  flex-direction:column;
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



.table-bikes thead{
  background-color: var(--main-color);
  color: white;
  text-align: center;
}

}

@media only screen and (max-width:670px){
 .general-container{
  padding: 10px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: var(--white);
  border-radius: 20px;
}
}
</style>