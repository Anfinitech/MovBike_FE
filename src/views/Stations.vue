<template>
  <div>
    <div>
      <component @loadcomponent="renderStationComponent" :is="activeOption" />
    </div>
  </div>
</template>

<script>
import StationsTable from "@/components/Stations/StationsTable.vue";
import CreateStation from "@/components/Stations/CreateStation.vue";
import DetailStation from "@/components/Stations/DetailStation.vue";

export default {
  name: "Stations",
  components: { StationsTable, CreateStation, DetailStation },
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