import superagent from "superagent";
import cheerio from "cheerio";

import { ScrapedBoothItem } from "@/models/ScrapedBoothItems";

export default class BoothCrawler {
  scrapedBooothItem: ScrapedBoothItem | null;
  constructor() {
    this.scrapedBooothItem = null;
  }

  // constructor では async を使えないためこちらを使う。
  static async init(url: string): Promise<BoothCrawler | undefined> {
    const boothCrawler = new BoothCrawler();

    try {
      if (url === "") throw new Error("URL が空欄です");

      const result = await superagent.get(url);

      const $ = cheerio.load(result.text);
      let number = this.getNumber(url);
      let title = this.getTitle($);
      let shopName = this.getShopName($);
      let shopUrl = this.getShopUrl($);
      let description = this.getDescription($);
      let modules = [""];
      let tags = this.getTags($);
      await this.downloadImage($, number);
      boothCrawler.scrapedBooothItem = {
        url,
        number,
        title,
        shopName,
        shopUrl,
        description,
        modules,
        tags,
      };
      return boothCrawler;
    } catch (e) {
      console.log(e);
    }
  }

  private static getNumber(url: string): string {
    try {
      // URL から商品番号を抽出する
      const re = /\d+/;
      const result = re.exec(url);
      if (result === null) throw new Error("商品番号が抜き出せませんでした");

      return result[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // 商品画像をダウンロード
  private static async downloadImage($: any, number: string) {
    try {
      let imageUrl = "";
      // 1番目 img.market-item-detail-item-image の src
      // 2番目以降 img.market-item-detail-item-image の data-lazy
      $("img.market-item-detail-item-image").each((i: number, elm: any) => {
        // TODO: ちゃんとした画像を取得できてるか確認する
        //console.log($(elm).attr("data-lazy"));
        if (i === 0) {
          imageUrl = $(elm).attr("src");
        }
      });

      if (imageUrl === "") {
        throw new Error("画像の URL が取得できませんでした");
      }

      console.log(`画像URL: ${imageUrl}`);
      const request = require("request");
      let fs = require("fs");

      const imageFileSavePath = `E:/Document/BoothItemManager/${number}.jpg`;
      console.log(`${imageFileSavePath} に画像ファイルをダウンロードします。`);
      if (fs.existsSync(imageFileSavePath)) {
        throw new Error(
          `ファイルパス: ${imageFileSavePath} は既に存在します。`
        );
      }

      await request({ method: "GET", url: imageUrl, encoding: null }, function(
        error: any,
        response: any,
        body: any
      ) {
        if (!error && response.statusCode === 200) {
          fs.writeFileSync(imageFileSavePath, body, "binary");
          console.log(
            `画像ファイルのダウンロード成功 \n ファイルパス: ${imageFileSavePath}`
          );
        }
      });
    } catch (e) {
      console.log(e);
      //throw new Error("画像のダウンロードに失敗");
    }
  }

  // 商品名を取得
  private static getTitle($: any): string {
    // TODO: 取得できなかった場合の例外処理
    return $(".u-tpg-title1")
      .first()
      .text();
  }

  // ショップ名を取得
  private static getShopName($: any): string {
    // TODO: 取得できなかった場合の例外処理
    return $(".u-text-ellipsis")
      .first()
      .text();
  }

  // ショップURLを取得
  private static getShopUrl($: any): string {
    // TODO: 取得できなかった場合の例外処理
    return $(".nav")
      .first()
      .attr("href");
  }

  // 商品説明を取得
  private static getDescription($: any): string {
    // TODO: 取得できなかった場合の例外処理
    return $(".js-market-item-detail-description")
      .first()
      .text();
  }

  //TODO: module を追加

  // タグ一覧を取得
  private static getTags($: any): string[] {
    let tags: string[] = [];
    $(".search-guide-tablet-label-inner").each((i: number, element: any) => {
      tags.push($(element).text());
    });
    return tags;
  }

  showItems() {
    if (this.scrapedBooothItem == null) {
      return;
    }
    console.log(this.scrapedBooothItem);
  }
}
