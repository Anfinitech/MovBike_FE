<template>
  <div class="general-container">
    <div class="form-container">
      <div class="title"> <h1>Actualizar bicicleta</h1></div>
    <form
      name="form"
      id="form"
      method="post"
      enctype="multipart/form-data"
      v-on:submit.prevent="actualizar()"
    >
      
      <br />
      <div class="form-group">
        <p>Condición:</p>
        <input
          type="radio"
          name="condicion"
          id="buena"
          value="true"
          v-model="condicion"
        />
        <label class="rad" for="buena">En buen estado</label>
        <br />
        <input
          type="radio"
          name="condicion"
          id="averiada"
          value="false"
          v-model="condicion"
        />
        <label class="rad" for="averiada">Averiada</label>
      </div>
      <div class="form-group">
        <p>Ubicación:</p>

        <select v-model="bikeCreation.creation_data.current_station">
          <option disabled selected>Seleccione una estacion</option>
          <option
            v-for="station in stations"
            :key="station.e_id"
            :value="station.e_id"
          >
            {{ station.e_nombre }}
          </option>
        </select>
      </div>
      <br />
      <div class="botones">
      <button class="boton_back" v-on:click.self.prevent="renderStationsTable"><fa icon="undo" class="back"/>Volver</button>
      <button class="boton_up"><fa icon="edit" class="edit"/>Actualizar</button>
      </div>
    </form>
    </div>

    <div class="image-container">
    <p class="caja">
      Haciendo seguimiento continuo a cada nodo para mejorar nuestro servicio y
      la experiencia de usuario.
    </p>
    </div>
  </div>
</template>


<script>
import axios      from 'axios';
export default {
  name: "UpdateBike",
  data: function() {
    return {
      bikeCreation: {
        b_id : 0,
        creation_data: {
          condicion: 0,
          current_station : 0,
        }
      },
      stations: [],
    }
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "BikesTable");
    },
  },
};
</script>

<style scoped>

.general-container {
    height:35em;
    width: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-image: url('../../assets/stations/UpdateBike2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.title {
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
    padding: 1.5rem 1.5rem;
    width: 350px;    
    background-color: rgba(255, 255, 255, 0.822);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    margin: 20px;
    align-items: center;
    margin-left: 5%;
    box-shadow: 0 0 10px rgb(103, 0, 124);
}
.image-container {
    width: 55%;
    box-sizing: border-box;
    align-items: center;
}

/*------------Formulario------------*/
form {
  padding-left: 30px;
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
  margin-left:10px;
  color: #0081cf;
}

.form-group input{
  margin-left: 20px;  
  margin-bottom: 10px;
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
  width: 400px;
  margin-left: 10%;
  margin-top: 60px;
  overflow: hidden;
  color:#f2fcff;
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

.botones{
  flex-direction: column;
}
}

@media only screen and (max-width: 650px) {
.image-container {
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