export interface BoothItemState {
  items: BoothItem[];
}

export interface BoothItem {
  id: number;
  number: number;
  name: string;
  tags: string[];
  url: string;
  imageFile: any;
}
