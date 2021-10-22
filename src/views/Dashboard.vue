<template>
  <div>
    <Sidebar />
    <Header />
      
     <main>
            <div class="cards">
                <div class="card-single">
                    <div>
                        <h2>Estaciones</h2>
                    </div>
                    <div>
                        <img src="@/assets/Estacion.svg" width="250px" alt="">
                    </div>
                </div>
                <div class="card-single">
                    <div>
                        <h2>Bicicletas</h2>
                    </div>
                    <div>
                        <img src="@/assets/Bicis.svg" width="200px" alt="">
                    </div>
                </div>
            </div>
        </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: "Dashboard",
  components: {
    Header,
    Sidebar,
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

#nav-toggle:checked ~ .main{
  margin-left: 70px;
}

main {
  margin-top: 50px;
  margin-left: 335px;
  padding: 2rem 1.5rem;
  background: #e7e9f5;
  min-height: calc(100vh - 90px);
}

/*=========== Tarjetas de selección del dashboard ===========*/
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;
  margin: 1rem 1rem;
}

.card-single {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
}

.card-single:hover {
  background: var(--main-color);
}

.card-single:hover h2 {
  color: var(--white);
  padding-right: 10px;
}


</style>