<template>
  <main>
    <div class="cards">
      <div class="card-single">
        <div>
          <h2>Estaciones</h2>
        </div>
        <div>
          <img
            src="@/assets/Estacion.svg"
            width="250px"
            alt=""
          >
        </div>
      </div>
      <div class="card-single">
        <div>
          <h2>Bicicletas</h2>
        </div>
        <div>
          <img
            src="img/Bicis.svg"
            width="200px"
            alt=""
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style scoped>
main {
  margin-top: 85px;
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