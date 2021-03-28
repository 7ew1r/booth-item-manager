import { ScrapedBoothItem } from "@/models/ScrapedBoothItems";

export default class BoothItem implements ScrapedBoothItem {
  number: string | null;
  url: string | null;
  title: string;
  shopName: string | null;
  shopUrl: string | null;
  description: string | null;
  modules: string[] | null;
  tags: string[] | null;
  created_at: any;

  imageFile: any;
  imageBase64: any;

  constructor(item: ScrapedBoothItem) {
    this.url = item.url;
    this.number = item.number;
    this.title = item.title;
    this.shopName = item.shopName;
    this.shopUrl = item.shopUrl;
    this.description = item.description;
    this.modules = item.modules;
    this.tags = item.tags;

    // TODO: Day.js などに変える？
    this.created_at = Date();

    const fs = require("fs");
    // TODO: ファイルの存在位置設定
    const pathPrefix = "E:/Document/BoothItemManager/";
    const imageFilePath = `${pathPrefix}${item.number}.jpg`;
    if (fs.existsSync(imageFilePath)) {
      this.imageFile = this.imageToBase64(imageFilePath);
    } else {
      this.imageFile = require(`@/assets/no-image.png`);
    }
  }

  private imageToBase64(filePath: string): string {
    // TODO: 例外処理
    const fs = require("fs");
    let converted = fs.readFileSync(filePath, "base64", function(
      err: any,
      data: any
    ) {
      if (err) throw err;
      return data;
    });
    return `data:image/jpeg;base64,${converted}`;
  }
}
