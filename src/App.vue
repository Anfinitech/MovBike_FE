<template>
  <div>
    <router-view v-on:completedLogIn="completedLogIn" />
  </div>
</template>


<script>
export default {
  name: "App",

  data: function () {
    return {
      is_auth: false,
    };
  },

  components: {},

  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (this.is_auth == false) this.$router.push({ name: "Login" });
      else this.$router.push({ name: "Dashboard" });
    },

    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("tokenAccess", data.token_access);
      localStorage.setItem("tokenRefresh", data.token_refresh);
      this.verifyAuth();
    },
  },

  created: function () {
    this.verifyAuth();
  },
};
</script>


<style>
</style>
