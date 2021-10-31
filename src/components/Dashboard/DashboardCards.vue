<template>
  <div class="cards">
    <div class="card-single" @click.self.prevent="loadStations()">
      <div @click.self.prevent="loadStations()">
        <h2 @click.self.prevent="loadStations()">Estaciones</h2>
      </div>
      <div @click.self.prevent="loadStations()">
        <img
          src="@/assets/home/img/Estacion.svg"
          width="250px"
          alt=""
          @click.self.prevent="loadStations()"
        />
      </div>
    </div>
    <div class="card-single" @click.self.prevent="loadBikes()">
      <div @click.self.prevent="loadBikes()">
        <h2 @click.self.prevent="loadBikes()">Bicicletas</h2>
      </div>
      <div @click.self.prevent="loadBikes()">
        <img
          src="@/assets/home/img/Bicis.svg"
          width="200px"
          alt=""
          @click.self.prevent="loadBikes()"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "DashboardCards",
  components: {},
  methods: {
    loadBikes: function () {
      this.$router.push({ name: "Bikes" });
    },
    loadStations: function () {
      this.$router.push({ name: "Stations" });
    },
  },
};
</script>
