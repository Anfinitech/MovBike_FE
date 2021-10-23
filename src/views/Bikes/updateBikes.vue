<template>
  <div>
    <Header />
    <Sidebar />
    <main>

      <h1>
        update bikes
      </h1>
      <!-- 
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
      </div> -->
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: "updateBikes",
  components: {
    Header,
    Sidebar
  },

  methods: {
    /*  
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
   }, I
*/
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