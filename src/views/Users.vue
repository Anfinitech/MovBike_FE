<template>
  <div>
    <component @loadcomponent="renderUserComponent" :is="activeOption" />
  </div>
</template>

<script>
import UsersTable from "@/components/Users/UsersTable.vue";
import CreateUser from "@/components/Users/CreateUser.vue";
import UpdateUser from "@/components/Users/UpdateUser.vue";
import DeleteUser from "@/components/Users/DeleteUser.vue";

export default {
  name: "Users",
  components: { UsersTable, CreateUser, UpdateUser, DeleteUser },
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