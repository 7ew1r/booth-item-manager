<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title
          v-text="name"
          v-bind="attrs"
          v-on="on"
        ></v-list-item-title>
      </template>

      <v-card>
        <v-overlay :value="overray"
          ><v-progress-circular indeterminate size="64"></v-progress-circular
        ></v-overlay>
        <v-card-title>
          <span class="headline">URL から BOOTH アイテムを追加</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="url"
                    label="URL*"
                    placeholder="https://booth.pm/ja/items/xxxxxx"
                    :rules="rule"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            キャンセル
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="scraping(url)"
            :disabled="!valid"
          >
            実行
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import BoothCrawler from "@/Crawlers/BoothCrawler";
import BoothItem from "@/models/BoothItem";

export default Vue.extend({
  data: () => ({
    valid: false,
    rule: [(v: any) => !!v || "この項目は必須です"],
    name: "アイテムを追加（URL）",
    dialog: false,
    url: "",
    overray: false,
  }),
  methods: {
    async scraping(url: string) {
      this.overray = true;

      try {
        const crw = await BoothCrawler.init(url);

        if (crw === undefined || crw.scrapedBooothItem === null) {
          throw new Error("商品の取得に失敗");
        }
        crw.showItems();
        if (
          this.$store.state.items.some((e: BoothItem) => {
            e.number === crw.scrapedBooothItem?.number;
          })
        ) {
          throw new Error("そのアイテムは既に存在します");
        }

        const newItem = new BoothItem(crw.scrapedBooothItem);
        this.$store.dispatch("addItem", newItem);

        this.dialog = false; // ダイアログを消す
      } catch (e) {
        console.error(e);
        console.error("商品の取得に失敗");
      } finally {
        this.overray = false;
      }
    },
  },
});
</script>
