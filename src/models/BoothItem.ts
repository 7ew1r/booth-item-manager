export default class BoothItem {
  id: number;
  number: number;
  name: string;
  tags: string[];
  url: string;
  imageFile: any;

  constructor(id: number, number: number, name: string, tags: string[]) {
    this.id = id;
    this.number = number;
    this.name = name;
    this.tags = tags;
    this.url = `https://booth.pm/ja/items/${number}`;

    let imageFilePath = `../../assets/${number}.jpg`;

    const fs = require("fs");

    const electron = require("electron");
    const app = electron.app;
    console.log(electron);
    console.log(app);
    // console.log(app.getVersion());
    // console.log(imageFilePath);
    // console.log(fs.existsSync(imageFilePath));

    if (fs.existsSync(imageFilePath)) {
      this.imageFile = require(`@/assets/${number}.jpg`);
    } else {
      this.imageFile = require(`@/assets/2495796.jpg`);
    }
  }
}
