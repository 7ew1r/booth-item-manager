export interface ScrapedBoothItem {
  number: string | null;
  url: string | null;
  title: string;
  shopName: string | null;
  shopUrl: string | null;
  description: string | null;
  modules: string[] | null;
  tags: string[] | null;
  // 画像のURL
}
