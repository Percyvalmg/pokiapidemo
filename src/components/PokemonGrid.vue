<template>
  <div style="height: 100vh">
    <SearchInput @onSearch="fetchPokemonByName"/>
    <div v-if="!loading" class="container-fluid">
      <b-row id="my-pokemon-grid" class="justify-content-center gy-2 gx-1">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="12" md="8" class="mt-3">
          <b-pagination
            @change="onPageChanged"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            limit="3"
            aria-controls="my-pokemon-grid"
            align="center"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <div
      v-else
      class="container h-100"
      style="display: flex; justify-content: center; align-items: center"
    >
      <b-row>
        <b-col cols="12" class="text-center">
          <b-spinner type="grow" variant="dark" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { Pokemon } from "./types";
import PokemonCard from "@/components/PokemonCard.vue";
import SearchInput from "@/components/SearchInput.vue";

export default Vue.extend({
  name: "PokemonGrid",
  props: {},
  components: {
    PokemonCard,
    SearchInput,
  },
  data() {
    return {
      errored: false,
      loading: true,
      pokemons: [] as Pokemon[],
      currentPage: 1,
      perPage: 1,
      offset: 0,
      rows: 100,
    };
  },
  methods: {
    onPageChanged(page: number) {
      const newOffSet = page * 8 - 8;
      this.currentPage = newOffSet / 8 + 1;
      this.fetchPokemons(newOffSet);
    },
    fetchPokemonByName(name: string){
      axios
        .get(`http://localhost:8082/api/v1/pokemon/${name}`)
        .then((response) => {
          const data = response.data;
          this.pokemons = [];
          this.pokemons.push(data);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    fetchPokemons(offset: number) {
      this.loading = true;
      let limit = 8;
      if (offset > 92) limit = 100 - offset;

      axios
        .get(
          `http://localhost:8082/api/v1/pokemon?offset=${offset}&limit=${limit}`
        )
        .then((response) => {
          const data = response.data;
          this.pokemons = data.pokemonList as Pokemon[];
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.fetchPokemons(this.offset);
  },
});
</script>