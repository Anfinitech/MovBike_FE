<template>
  <div>
    <div>
      <component @loadcomponent="renderBikeComponent" :is="activeOption" />
    </div>
  </div>
</template>

<script>
import BikesTable from "@/components/Bikes/BikesTable.vue";
import CreateBike from "@/components/Bikes/CreateBike.vue";
import UpdateBike from "@/components/Bikes/UpdateBike.vue";
import DeleteBike from "@/components/Bikes/DeleteBike.vue";

export default {
  name: "Bikes",
  components: { BikesTable, CreateBike, UpdateBike, DeleteBike },

  data: function () {
    return {
      activeOption: 'BikesTable'
    }
  },
  methods: {
    renderBikeComponent(message){
      this.activeOption = message;
    }
  },
};
</script>