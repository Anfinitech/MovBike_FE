<template>
  <div>
<<<<<<< HEAD
=======
    
>>>>>>> develop
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