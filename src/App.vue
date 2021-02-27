<template>
  <div id="app">
    <v-app>
    <v-container fluid>
      <!-- <v-col> -->
      <v-row>
        <Card v-for="item in [1,2,3,4,5]" :key="item" title="商品1"/>
      </v-row>
    </v-container>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './components/Card.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Card
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
