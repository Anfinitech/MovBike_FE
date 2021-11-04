<template>
  <div>
    <h1>Nuestro Equipo</h1>
    <div>
      <OurTeamCards />
    </div>
  </div>
</template>

<script>
import OurTeamCards from "@/components/OurTeam/OurTeamCards.vue";

export default {
  name: "OurTeam",
  components: { OurTeamCards },
};
</script>