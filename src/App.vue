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
          <!-- <AddItemDialog /> -->
          <!-- <v-btn @click="showData" elevation="2">DB読み込み</v-btn> -->
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchTextField from "./components/SearchTextField.vue";
import Card, { Item } from "./components/Card.vue";
import AddItemButton from "./components/AddItemButton.vue";
import AddItemDialog from "./components/AddItemDialog.vue";
import BoothItem from "./models/BoothItem";

var Datastore = require("nedb");
var db = new Datastore();

let docs: Array<Item> = [
  {
    id: 1,
    itemNumber: 954376,
    name: "オリジナル3Dモデル『キッシュ』",
    tags: ["3Dモデル", "VRChat"],
  },
  {
    id: 2,
    itemNumber: 2495796,
    name: "オリジナル3Dモデル『レイニィ』ver.1.02",
    tags: [],
  },
  {
    id: 3,
    itemNumber: 2645754,
    name: "オリジナル3Dモデル 　「ぷれっつぇる」",
    tags: [],
  },
];

docs.forEach((doc) =>
  db.insert(doc, function(err: any) {
    if (err !== null) {
      console.error(err);
    }
  })
);

export default Vue.extend({
  data: () => ({
    items: [] as Array<BoothItem>,
  }),

  name: "App",
  components: {
    Card,
    SearchTextField,
    AddItemButton,
    // AddItemDialog,
  },
  created: function() {
    db.find({}, (err: any, docs: Array<Item>) => {
      if (err !== null) {
        console.error(err);
      }

      console.log(docs);

      this.items = docs.map(
        (doc: Item) => new BoothItem(doc.id, doc.itemNumber, doc.name, doc.tags)
      );
    });
  },
  computed: {
    itemSortedById: function() {
      return Array.from(this.items).sort((a: BoothItem, b: BoothItem) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
    },
  },
  methods: {
    showData(): Array<Object> {
      return db.find({}, (err: any, docs: any) => {
        if (err !== null) {
          console.error(err);
        }

        console.log(docs);
        return docs;
      });
    },
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
