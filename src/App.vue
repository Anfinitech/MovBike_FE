<template>
  <div>
    <router-view 
    v-on:completedLogIn="completedLogIn"/>
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
      else this.$router.push({ name: "Home" });
    },

    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth();
    }

  },

  created: function () {
    this.verifyAuth();
  },
};
</script>


<style>
</style>
