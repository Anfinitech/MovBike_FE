<template>
  <div class="general-container">
  <div class="form-container">  
    <div class="general-title"><h1>Actualizar estación</h1></div>
    <form
      name="form"
      id="form"
      method="post"
      enctype="multipart/form-data"
      v-on:submit.prevent="actualizar()"
    >
      <h3 class="title">Estación {{ station.nombre }}</h3>
      <br />
      <div class="form-group">
        <label for="nombre" class="txt_negrita">Nombre:</label>
        <br />
        <input
          v-model="station.nombre"
          type="text"
          id="name"
          name="name"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label class="sub-title" for="estado">Estado:</label>
        <br />
        <input
          type="radio"
          name="estado"
          id="abierta"
          value="true"
          v-model="estado"
          required
        />
        <label class="rad" for="abierta">Abierta</label>
        <br />
        <input
          type="radio"
          name="estado"
          id="cerrada"
          value="false"
          v-model="estado"
        />
        <label class="rad" for="cerrada">Cerrada</label>
      </div>
      <div class="form-group">
        <label class="sub-title" for="capacidad">Capacidad:</label>
        <br />
        <input
          type="int"
          id="capacidad"
          name="capacidad"
          class="form-control"
          v-model="station.capacidad"
        />
      </div>
      <br />

      <div class="botones">
      <button class="boton_up"><fa icon="edit" class="edit"/>Actualizar</button>
      <button class="boton_back" v-on:click.self.prevent="renderStationsTable">
       <fa icon="undo" class="back"/> Volver
      </button>
      </div>
    </form>
  </div>

  <div class="info-container">
    <p class="caja">
      Mucho más que una empresa, somos una familia.
    </p>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateStation",
  data: function () {
    return {
      station: {
        e_id: "id",
        e_nombre: "nombre",
        e_estado: "estado",
        e_capacidad: "capacidad",
      },
    };
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },
  },
};
</script>

<style scoped>
/*------------Formulario------------*/

.general-container {
    height:35em;
    width: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-image: url('../../assets/stations/UpdateStations.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.general-title {
  display: flex;
  justify-content: space-around;
  position: initial;
  padding-bottom: 30px;
  margin-top: 20px;
}

.form-container {
    color: #5046af;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0rem 1.5rem;
    width: 410px;    
    background-color: rgba(233, 233, 233, 0.623);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    margin: 20px;
    align-items: center;
    margin-left: 5%;
    box-shadow: 0 0 10px rgb(190, 190, 190);
}
.info-container {
    width: 55%;
    box-sizing: border-box;
    align-items: center;
    background-color: transparent;
    
}

form {
  padding-left: 15px;
  font-size: 18px;
  margin-right: 10%;
  border: none;
  text-align: left;
  font-weight: 600;
}
.form-group{
  margin-bottom: 15px;
}

.form-group label{
  color: #0081cf;
}

.form-group .sub-title{
  color: #5046af;
}

.form-group input{
  margin-bottom: 10px;
  border-radius: 10px;
  border: #5046af solid 2px;
  outline: none;
}

.form-group select{
  border: #5046af solid 2px;
  border-radius: 10px;
}

.form-control {
  width: 300px;
}
.rad {
  font-size: 15px;
}

.botones{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.boton_up {
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
  display: inline;
}

.boton_back {
  padding: 10px 10px;
  position: relative;
  margin: 3px 0px 5px;
  text-decoration: none;
  background-color: #00C2A8;
  border: none;
  border-radius: 7px;
  font-weight: 600;
  color: var(--white);
  cursor: pointer;
}

.boton_back:hover{
  background-color: var(--white);
  color: #00C2A8;
}

.boton_up:hover{
  background-color: var(--white);
  color: #0081cf;
}

.back{
  margin-right: 5px;
}

.edit{
  margin-right: 5px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
  width: 200px;
  margin-left: 10%;
  margin-top: 60px;
  overflow: hidden;
  color:#f2fcff;
  text-align: left;
}

@media only screen and (max-width: 950px) {
.caja {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
  width: 200px;
  margin-top: 60px;
  overflow: hidden;
  color:#f2fcff;
}

.form-container{
  width: 450px;
}

.general-title{
  padding-bottom: 5px;
}

.botones{
  flex-direction: column;
  margin-top: 0;
} 

.form-group{
  margin-bottom: 0;
}

}

@media only screen and (max-width: 650px) {
.info-container {
  display: none;
}

.form-container{
  width:100%;
}
.botones{
  flex-direction: column;
}
}
</style>
