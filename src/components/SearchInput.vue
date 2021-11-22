<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-row class="justify-content-center">
        <b-col cols="8" md="6" class="m-3">
          <b-input-group class="mt-3">
            <b-form-input
              v-model="form.searchText"
              class="col-lg-4"
              placeholder="Pokemon name or id"
            ></b-form-input>
            <b-input-group-append>
              <b-button type="submit" variant="dark"
                ><b-icon icon="search"></b-icon
              ></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "SearchInput",
  props: {},
  data() {
    return {
      form: {
        searchText: "",
      },
    };
  },
  emits: ["onSearch"],
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$emit("onSearch", this.form.searchText);
    },
    onReset(event) {
      event.preventDefault();
      this.form.searchText = "";
    },
  },
});
</script>
