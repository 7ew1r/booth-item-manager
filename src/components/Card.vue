<template>
  <v-card :loading="loading" class="mx-2 my-5" max-width="300">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="300" width="300" :src="item.imageFile"></v-img>

    <v-card-title>{{ item.title }}</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip v-for="tag in item.tags" :key="tag">{{ tag }}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        編集
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="openExploer"><v-icon>mdi-folder-open</v-icon></v-btn>
      <v-btn icon @click="openWebBrowser"
        ><v-icon>mdi-share-variant</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export interface Item {
  id: number;
  itemNumber: number;
  name: string;
  tags: string[];
}

import Vue from "vue";
import BoothItem from "../models/BoothItem";

export default Vue.extend({
  data: () => ({
    loading: false,
    selection: 1,
    transparent: "rgba(255, 255, 255, 0)",
  }),

  props: {
    item: {
      type: Object as () => BoothItem,
    },
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    openExploer() {
      const { shell } = require("electron");
      shell.openPath("C:");
    },
    openWebBrowser() {
      const { shell } = require("electron");
      shell.openExternal(this.item.url);
    },
  },
});
</script>

<style lang="scss" scoped>
.show-btns {
  color: rgba(0, 0, 0, 1) !important;
}
</style>
