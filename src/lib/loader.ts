import { Asset } from "../types";

export const loadAssets = (scene: Phaser.Scene, assets: Asset[]) => {
  for (const asset of assets) {
    switch (asset.type) {
      case "image":
        scene.load.image(asset.key, asset.path);
        break;
      case "aseprite":
        scene.load.aseprite(asset.key, asset.path, asset.json);
        break;
      case "tilemapTiledJSON":
        scene.load.tilemapTiledJSON(asset.key, asset.path);
        break;
      default:
        throw new Error(`Asset type not supported: ${asset.key}`);
    }
  }
};
