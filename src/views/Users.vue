<template>
  <div>
    <h1>Usuarios</h1>
    <div>
      <component @loadcomponent="renderUserComponent" :is="activeOption" />
    </div>
  </div>
</template>

<script>
import UsersTable from "@/components/Stations/StationsTable.vue";

export default {
  name: "Stations",
  components: { UsersTable },
  data: function () {
    return {
      activeOption: "UsersTable",
    };
  },
  methods: {
    renderUserComponent(message){
      this.activeOption = message;
    }
  },
};
</script>