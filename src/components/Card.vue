<template>
  <v-card
    :loading="loading"
    class="mx-3 my-12"
    max-width="300"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="300"
      width="300"
      src="@/assets/954376.jpg"
    ></v-img>

    <v-card-title>{{ item.name }}</v-card-title>

    <!-- <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text> -->

    <!-- <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title> -->

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
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        編集
      </v-btn>
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



import Vue from 'vue';

  export default Vue.extend({
    data: () => ({
      loading: false,
      selection: 1,
          }),

    props: {
        item: {
          type: Object as () => Item
        },
        title: String,
    },

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  });
</script>