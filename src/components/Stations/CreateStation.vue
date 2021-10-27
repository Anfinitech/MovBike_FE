<template>
  <div class="general-container">
    <h1>Registrar Estacion</h1>
    <form name="form" id="form" v-on:submit.prevent="crear()">
      <h3 class="title">Nueva Estacion</h3>
      <br />
      <p>
        Nombre:
        <input
          type="text"
          name="e_nombre"
          placeholder="Nombre"
          class="form-control"
          v-model="nueva.nombre"
        />
      </p>
      <p>
        Capacidad:
        <input
          type="int"
          name="e_capacidad"
          placeholder="Capacidad"
          class="form-control"
          v-model="nueva.capacidad"
        />
      </p>
      <p>Estado:</p>
      <input type="radio" id="abierta" value="true" v-model="estado" />
      <label class="rad" for="abierta">Abierta</label>
      <br />
      <input type="radio" id="cerrada" value="false" v-model="estado" />
      <label class="rad" for="cerrada">Cerrada</label>

      <br />
      <button class="boton">Crear</button>
      <button class="boton" v-on:click="renderStationsTable">Volver</button>
    </form>
    <p class="caja">
      Construyendo un nodo de bienestar para nuestra comunidad.
    </p>
    <v-container fluid>
      <img src="@/assets/stations/images.jpg" alt="" />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreateStation",
  data() {
    return {
      nueva: {
        nombre: "",
        capacidad: "",
        estado: "",
      },
    };
  },

  methods: {
    renderStationsTable: function () {
      this.$emit("loadcomponent", "StationsTable");
    },
    crear() {
      alert(this.nueva);
    },
  },
};
</script>


<style scoped>
/*------------Formulario------------*/
form {
  width: 250px;
  padding: 20px;
  font-size: 20px;
  float: right;
  margin-right: 15%;
  border: 2px double purple;
}
.boton {
  width: 80px;
  font-size: 12px;
  height: 22px;
}
.rad {
  font-size: 15px;
}
/*------------Mensaje--------------*/
.caja {
  font-family: sans-serif;
  font-size: 20px;
  width: 350px;
  margin-left: 15%;
  margin-top: 30px;
  overflow: hidden;
}
/*--------------Imagen-------------*/
v-container {
  margin-left: 15%;
}
</style>


