<template>
  <header>
    <link rel="stylesheet" href="@/assets/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css">
    <h1>
      <fa icon="bars" />
      <label for="nav-toggle">
         <i class="fa fa-bars" aria-hidden="true"></i>
      </label>
    </h1>
   
    <div class="user-wrapper">
      <img
        src="@/assets/avatar.jpg"
        width="50px"
        height="50px"
        alt=""
      >
      <div>
        <h4>
          {{username}}
        </h4>
        <small>Super admin</small>
      </div>
    </div>
  </header>

</template>

<script>
export default {

  name: 'Header',
  data: function () {
    return {
      username: localStorage.getItem("username"),
    }

  }

}
</script>

<style scoped>


#nav-toggle {
  display: none;
}

#nav-toggle:checked + .sidebar {
  width: 70px;
}

#nav-toggle:checked + .sidebar .brand:last-child {
  width: 60px;
  margin: 20px 5px 0 10px !important;
}

#nav-toggle:checked + .sidebar li {
  padding-left: 1rem;
  text-align: center;
}

#nav-toggle:checked + .sidebar li a {
  font-size: 1.8rem;
  padding-left: 0rem;
}

#nav-toggle:checked + .sidebar li a span {
  padding-right: 1rem;
}

#nav-toggle:checked + .sidebar li a span:last-child {
  display: none;
}

#nav-toggle:checked ~ .main-container {
  margin-left: 70px;
}

#nav-toggle:checked ~ .main-container header {
  width: calc(100% - 70px);
  left: 70px;
}
/*========= Cabecera ==========*/
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 345px;
  width: calc(100% - 345px);
  top: 0;
  z-index: 100;
  transition: left 300ms;
  background:white;
}

header label span {
  font-size: 1.7rem;
  padding-right: 1rem;
}

/*======= Contenedor de la descripción e imagen del usuario ===========*/
.user-wrapper {
  display: flex;
  align-items: center;
}

.user-wrapper img {
  margin-right: 1rem;
  border-radius: 50%;
}

.user-wrapper small {
  display: inline-block;
  color: var(--text-grey);
  margin-top: -3px !important;
}
</style>