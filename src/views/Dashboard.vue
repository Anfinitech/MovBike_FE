<template>
  <div>
    <Sidebar />
      <Header />
      <Main />
    <div class="main-container">

    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Main from '@/components/Main.vue'

export default {
  name: "Dashboard",
  components: {
    Header,
    Sidebar,
    Main
  },
  method: {
    activeLink: function () {
      let list = document.querySelectorAll('Sidebar ul li');
      list.forEach((item) =>
        item.classList.remove('hovered'));
      this.classList.add('hovered');
      list.forEach((item) =>
        item.addEventListener('mouseover', activeLink));
    }
  }

}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

/*Colores principales del template*/
:root {
  --main-color: #5046af;
  --text-grey: #8390a2;
  --white: #fff;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
}

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


</style>