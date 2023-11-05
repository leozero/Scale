import Phaser from "phaser";

export default class Garden extends Phaser.Scene {
  constructor() {
    super("garden");
  }

  preload() {
    this.load.image("human", "tilesets/tileset_human.png");
    this.load.tilemapTiledJSON("map_human", "maps/map_human.json");
  }

  create() {
    const level = this.add.tilemap("map_human");
    const tileset = level.addTilesetImage("human");
    console.log(
      "🚀 ~ file: garden.ts:16 ~ Garden ~ create ~ tileset:",
      tileset
    );
    if (tileset === null) {
      throw new Error("Tileset not found");
    }
    level.createLayer("Ground", tileset);
    level.createLayer("Road", tileset);
  }
}
