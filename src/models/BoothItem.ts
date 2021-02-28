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
    this.imageFile = require(`@/assets/${number}.jpg`);
  }
}
