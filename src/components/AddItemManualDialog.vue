<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title
          v-text="title"
          v-bind="attrs"
          v-on="on"
        ></v-list-item-title>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">アイテム追加（手動）</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="タイトル"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="url" label="URL"></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field label="フォルダパス"></v-text-field>
              </v-col> -->
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            閉じる
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit">
            追加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import BoothItem from "@/models/BoothItem";
import Vue from "vue";
// import Vuex from "vuex";

// import DB from "../db/db";

//const store = require("@/store/index");

export default Vue.extend({
  //store,
  data: () => ({
    title: "アイテムを追加（手動）",
    dialog: false,
    itemNumber: "",
    name: "",
    url: "",
    tags: [],
  }),

  props: {
    db: {
      type: Object as any,
    },
  },

  methods: {
    submit(): void {
      // let doc = {
      //   id: 999,
      //   itemNumber: this.itemNumber,
      //   name: this.name,
      //   tags: this.tags,
      // };

      let newItem = new BoothItem(
        999,
        //null,
        parseInt(this.itemNumber),
        this.name,
        this.tags
      );

      this.$store.dispatch("addItem", newItem);

      // DB.db.insert(doc, (err: any, docs: any) => {
      //   if (err !== null) {
      //     console.error(err);
      //   }

      //   console.log(docs);
      // });
      //console.log(store.state.counter);
    },
  },
});
</script>
