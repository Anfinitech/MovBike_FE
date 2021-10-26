<template>
  <div>
    <h1>Bicicletas</h1>
    <div>
      <component :is="activeOption" />
    </div>
  </div>
</template>

<script>
import BikesTable from "@/components/Bikes/BikesTable.vue";
import CreateBike from "@/components/Bikes/CreateBike.vue";

export default {
  name: "Bikes",
  components: { BikesTable, CreateBike },

  data: function () {
    return {
      activeOption: 'BikesTable'
    }
  }
};
</script>