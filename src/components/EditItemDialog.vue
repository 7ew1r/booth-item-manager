<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="deep-purple lighten-2" text v-bind="attrs" v-on="on"
        >詳細</v-btn
      ></template
    >

    <v-card>
      <v-card-title>
        <span>{{ item.title }}</span>
      </v-card-title>
      <v-card-subtitle
        ><v-btn text @click="openWebBrowser(item.shopUrl)">
          {{ item.shopName }}

          <v-icon right>
            mdi-link
          </v-icon>
        </v-btn></v-card-subtitle
      >
      <v-card-text>
        <div>{{ item.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          アイテムを削除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import BoothItem from "@/models/BoothItem";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    dialog: false,
  }),
  props: {
    item: {
      type: Object as () => BoothItem,
    },
  },
  methods: {
    openWebBrowser(url: string) {
      const { shell } = require("electron");
      shell.openExternal(url);
    },
  },
});
</script>
