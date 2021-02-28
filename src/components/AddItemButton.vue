<template>
  <v-menu top :offset-y="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="add-item-btn" fab color="primary" v-bind="attrs" v-on="on"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </template>

    <v-list>
      <v-list-item link><AddItemManualDialog /></v-list-item>
      <v-list-item link><AddItemUrlDialog /></v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";

import AddItemManualDialog from "./AddItemManualDialog.vue";
import AddItemUrlDialog from "./AddItemUrlDialog.vue";

export default Vue.extend({
  data: () => ({}),
  components: {
    AddItemManualDialog,
    AddItemUrlDialog,
  },
});
</script>

<style scope lang="scss">
.add-item-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
