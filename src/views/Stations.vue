<template>
  <div>
    <h1>Estaciones</h1>
    <div>
      <StationsTable />
    </div>
  </div>
</template>

<script>
import StationsTable from "@/components/StationsTable.vue";

export default {
  name: "Stations",
  components: { StationsTable },
};
</script>