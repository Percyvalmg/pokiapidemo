<template>
  <div class="home">
    <PokemonGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PokemonGrid from "@/components/PokemonGrid.vue";

export default Vue.extend({
  name: "Home",
  components: {
    PokemonGrid,
  },
});
</script>
