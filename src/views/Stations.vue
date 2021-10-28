<template>
  <div>
    <h1>Estaciones</h1>
    <div>
      <component @loadcomponent="renderStationComponent" :is="activeOption" />
    </div>
  </div>
</template>

<script>
import StationsTable from "@/components/Stations/StationsTable.vue";
import CreateStation from "@/components/Stations/CreateStation.vue";
import UpdateStation from "@/components/Stations/UpdateStation.vue";
import DeleteStation from "@/components/Stations/DeleteStation.vue";

export default {
  name: "Stations",
  components: { StationsTable, CreateStation, UpdateStation, DeleteStation},
  data: function () {
    return {
      activeOption: "StationsTable",
    };
  },
  methods: {
    renderStationComponent(message){
      this.activeOption = message;
    }
  },
};
</script>