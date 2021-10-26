<template>
  <div>
    <h1>Dashboard</h1>
    <div>
      <DashboardCards />
    </div>
  </div>
</template>

<script>
import DashboardCards from "@/components/Dashboard/DashboardCards.vue";

export default {
  name: "Dashboard",
  components: { DashboardCards },
};
</script>