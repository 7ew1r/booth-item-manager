<template>
  <div id="app">
    <v-app>
      <v-app-bar app>
<v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
  </v-app-bar>
    <v-container fluid>
      <v-row>
        <Card v-for="item in items" :key="item.id" :item="item" />
      </v-row>
      <v-btn @click="showData"
  elevation="2"
>DB読み込み</v-btn>
    </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './components/Card.vue';

var Datastore = require('nedb');
var db = new Datastore();

var doc = {
    name: "hoge",
    age: 20
};

db.insert(doc, function(err: any) {
    var result = db.find({}, (err: any, docs: any) => {
        console.dir(docs);
    });
    console.log(result);
});

// //インメモリでDB作成
// var Database = require("nedb");
// var namelistDB = new Database();
// //データ読み込み挿入
// import dbData from './db/namelist.json';
// namelistDB.insert(dbData);

export default Vue.extend({
  data: () => ({
    items: [
      {id: 1, itemNumber: 954376, name: "オリジナル3Dモデル『キッシュ』", tags: ["3Dモデル","VRChat"]},
       {id: 2, itemNumber: 2495796, name: "オリジナル3Dモデル『レイニィ』ver.1.02"},
        {id: 3, itemNumber: 954376, name: "オリジナル3Dモデル『キッシュ』"},
    ]
  }),

  name: 'App',
  components: {
    Card
  },
  methods: {
    showData() {
      // namelistDB.loadDatabase();
      // namelistDB.findOne({}, function(err, doc){
    // console.log(doc);
// });
      
    }
  }
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
}
</style>
