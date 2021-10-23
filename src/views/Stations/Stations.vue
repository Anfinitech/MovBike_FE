<template>
  <div>

    <Sidebar />
    <Header />
    <main>
      <div id="stations">
        <h1>Estaciones</h1>
        <div class="listaEstaciones">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Capacidad</th>
                <th>Ocupacion</th>
                <th>Bicis D</th>
                <th>Bicis ND</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody
              class="estaciones"
              v-for="estacion in estaciones"
              :key="estacion"
            >

              <td>{{ estacion.e_id }}</td>
              <td>{{ estacion.e_nombre }}</td>
              <td>{{ estacion.e_estado }}</td>
              <td>{{ estacion.e_capacidad }}</td>
              <td>{{ estacion.e_ocupacion }}</td>
              <td>{{ estacion.e_bicicletasD }}</td>
              <td>{{ estacion.e_bicicletasND }}</td>
              <td>{{ estacion.e_bicicletasT }}</td>

              <button id="create">Crear</button>
              <button id="update">Actualizar</button>
              <button id="delete">Borrar</button>

            </tbody>
          </table>
        </div>
      </div>
    </main>>
  </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: "Stations",
  components: {
    Header,
    Sidebar,
  },

  data() {
    return {
      estaciones: [],
    };
  },

  async created() {
    try {
      let token = localStorage.getItem("token_access");
      let url = "https://open-move-and-flow-be.herokuapp.com";
      const AuthStr = "jwt ".concat(token);
      let vue = this;
      await axios
        .get(url + "/estaciones/", {
          headers: { Authorization: AuthStr },
        })
        .then((response) => {
          vue.estaciones = response.data;

          console.log(response.data);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style >

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

main {
  margin-top: 50px;
  margin-left: 335px;
  padding: 2rem 1.5rem;
  background: #e7e9f5;
  min-height: calc(100vh - 90px);
}

.listaEstaciones {
  width: 80%;
  height: 750px;
  border: var(--borde) solid blue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.estaciones {
  border: var(--borde) solid black !important;

  margin-left: 300px;
  padding: 5px;
  height: 50px;
  width: 80%;
  display: flex;

  align-items: center;
  justify-content: space-around;
  box-shadow: 5px 6px 8px 5px rgb(0 0 0 / 20%);
  transition: 0.3s;
}
td {
  margin: 5px;
  padding: 5px;
  width: 200px !important;
}


.estaciones:hover {
  box-shadow: 0px 10px 5px 5px rgb(0 0 0 / 20%);
}
.acciones {
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