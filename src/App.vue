<template>
  <div id="app">
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Booth Item Manager</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row>
            <SearchTextField />
          </v-row>
          <v-divider />
          <v-row>
            <Card v-for="item in itemSortedById" :key="item.id" :item="item" />
          </v-row>
          <AddItemButton />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import Vuex from "vuex";

import SearchTextField from "./components/SearchTextField.vue";
import Card, { Item } from "./components/Card.vue";
import AddItemButton from "./components/AddItemButton.vue";
// import AddItemDialog from "./components/AddItemDialog.vue";

// const store = require("./store/index.js");

import DB from "./db/db";
import BoothItem from "./models/BoothItem";

// const Datastore = require("nedb");
// DB.db = new Datastore();

// let docs: Array<Item> = [
//   {
//     id: 1,
//     itemNumber: 954376,
//     name: "オリジナル3Dモデル『キッシュ』",
//     tags: ["3Dモデル", "VRChat"],
//   },
//   {
//     id: 2,
//     itemNumber: 2495796,
//     name: "オリジナル3Dモデル『レイニィ』ver.1.02",
//     tags: [],
//   },
//   {
//     id: 3,
//     itemNumber: 2645754,
//     name: "オリジナル3Dモデル 「ぷれっつぇる」",
//     tags: [],
//   },
// ];

// docs.forEach((doc) =>
//   DB.db.insert(doc, function(err: any) {
//     if (err !== null) {
//       console.error(err);
//     }
//   })
// );

import { ipcRenderer } from "electron";

export default Vue.extend({
  data: () => ({
    //items: [] as Array<BoothItem>,
  }),

  name: "App",
  // store,
  components: {
    Card,
    SearchTextField,
    AddItemButton,
    // AddItemDialog,
  },
  created: function() {
    const ayncFunc = async () => {
      const data = await ipcRenderer.invoke("get-version", "ping");
      console.log(data);
    };
    ayncFunc();
  },
  computed: {
    itemSortedById: function() {
      return Array.from(this.$store.state.items as Array<BoothItem>).sort(
        (a: BoothItem, b: BoothItem) => {
          if (a.created_at < b.created_at) return -1;
          if (a.created_at > b.created_at) return 1;
          return 0;
        }
      );
    },
  },
  methods: {
    // showData(): Array<Object> {
    // return DB.db.find({}, (err: any, docs: any) => {
    //   if (err !== null) {
    //     console.error(err);
    //   }
    //   console.log(docs);
    //   return docs;
    // });
    // },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .add-item-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>
