<template>
<h1>Usuarios</h1>
  <div>
    <component @loadcomponent="renderUserComponent" :is="activeOption" />
  </div>
</template>

<script>
import UsersTable from "@/components/Users/UsersTable.vue";
import CreateUser from "@/components/Users/CreateUser.vue";

export default {
  name: "Users",
  components: { UsersTable, CreateUser },
  data: function () {
    return {
      activeOption: "UsersTable",
    };
  },
  methods: {
    renderUserComponent(message) {
      this.activeOption = message;
    },
  },
};
</script>