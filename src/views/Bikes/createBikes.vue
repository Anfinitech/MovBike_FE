<template>
  <div>
    <Header />
    <Sidebar />
    <main>
      <h1>
        create bikes
      </h1>
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

    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

import axios from "axios";

export default {
  name: "createBikes",
  components: {
    Header,
    Sidebar
  },

  data() {
    return {
      newBike: {
        b_condicion: true,
        b_en_estacion: 0
      },
    }
  },

  methods: {
    createBikes: function () {
      let url = "https://open-move-and-flow-be.herokuapp.com";
      axios
        .post(url + "/bicicletas/", this.newBike)
        .then((result) => {
          console.log(result);
            alert(result.data)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  }


}
</script>

<style scoped>
main{
  display: flex;
  flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

form{
  width:500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

</style>