export default class BoothItem {
  id: number;
  number: number | null;
  name: string;
  tags: string[];
  url: string | null;
  imageFile: any;

  constructor(id: number, number: number, name: string, tags: string[]) {
    this.id = id;
    this.number = number;
    this.name = name;
    this.tags = tags;

    if (!isNaN(number)) {
      this.imageFile = require(`@/assets/${number}.jpg`);
      this.url = `https://booth.pm/ja/items/${number}`;
    } else {
      this.imageFile = require(`@/assets/no-image.png`);
      this.url = null;
    }
  }
}
