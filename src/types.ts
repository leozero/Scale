export type Matrix = Array<Array<number>>;

export type Asset = {
  key: string;
  path: string;
  json?: string;
  type: "image" | "aseprite" | "tilemapTiledJSON";
};
