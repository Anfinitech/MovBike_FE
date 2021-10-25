<template>
  <div>
    <h1>Bicicletas</h1>
    <div>
      <BikesTable />
    </div>
  </div>
</template>

<script>
import BikesTable from "@/components/BikesTable.vue";

export default {
  name: "Bikes",
  components: { BikesTable },
};
</script>