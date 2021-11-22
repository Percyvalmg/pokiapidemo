<template>
  <b-card
    border-variant="dark"
    :header="pokemon.name"
    header-bg-variant="dark"
    header-text-variant="white"
    :img-src="pokemon.sprites.front_default"
    :img-alt="pokemon.name"

    img-top
    tag="pokemon"
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      <b-button
        v-b-toggle="'collapse-' + pokemon.id"
        variant="outline-dark"
        style="float: right"
      >
        <b-icon icon="caret-down"></b-icon
      ></b-button>
      <b-collapse :id="'collapse-' + pokemon.id" class="mt-2">
        <b-card >
          <p class="card-text">Weight: {{ pokemon.weight }}</p>
        </b-card>
      </b-collapse>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Pokemon } from "../components/types";

export default Vue.extend({
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
  },
});
</script>