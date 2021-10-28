<template>
    <div class="general-container">
        <h1> Registrar Bicicleta </h1>
        <form name="form" id="form" v-on:submit.prevent="crear()">
      <h3 class="title">Nueva Bicicleta</h3>
      <br />
      <p>Condicion:</p>
      <input type="radio" name="condicion" id="buena" value="true" v-model="condicion" />
      <label class="rad" for="buena">En buen estado</label>
      <br />
      <input type="radio" name="condicion" id="averiada" value="false" v-model="condicion" />
      <label class="rad" for="averiada">Averiada</label>

      <br />
      <p>
        Ubicacion:
        <input
          type="int"
          name="e_capacidad"
          placeholder="Capacidad"
          class="form-control"
          v-model="nueva.capacidad"
        />
      </p>
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