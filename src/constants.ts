import { Asset } from "./types";

export const TILE_SIZE = 32;

export const assets: Record<string, Asset> = {
  tileset_human: {
    key: "human",
    path: "tilesets/tileset_human.png",
    type: "image",
  },
  bee_human: {
    key: "bee_human",
    path: "sprites/bee_human.png",
    type: "image",
  },
  bee: {
    key: "bee",
    path: "sprites/bee.png",
    json: "sprites/bee.json",
    type: "aseprite",
  },
  map_human: {
    key: "map_human",
    path: "maps/map_human.json",
    type: "tilemapTiledJSON",
  },
  beekeeper_female: {
    key: "beekeeper_female",
    path: "sprites/beekeeper_female.png",
    json: "sprites/beekeeper_female.json",
    type: "aseprite",
  },
};

export enum LEVELS {
  GARDEN = "Garden",
}

export const humanLayers = ["Ground", "Road", "Day", "Obstacles"];
