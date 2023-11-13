import { Player } from "../prefab/player";
import { Asset, Matrix } from "../types";
import { findPath, generateMatrixFromLevel } from "./pathFinding";

export class Level {
  scene: Phaser.Scene;
  tilemap: Phaser.Tilemaps.Tilemap;
  tileset: Phaser.Tilemaps.Tileset;
  layers: string[];
  collisionLayers: string[];
  matrix: Matrix;

  constructor(
    scene: Phaser.Scene,
    map: Asset,
    tiles: Asset,
    layers: string[],
    collisionLayers: string[]
  ) {
    this.scene = scene;
    this.tilemap = this.setTilemap(map);
    this.tileset = this.setTileset(tiles);
    this.layers = layers;
    this.addLayers();
    this.collisionLayers = collisionLayers;
    this.matrix = this.generateMatrix();
  }

  public setCamera(target: Phaser.GameObjects.Sprite) {
    this.scene.cameras.main.startFollow(target);
    this.scene.cameras.main.setZoom(2);
  }

  setTilemap(map: Asset) {
    return this.scene.add.tilemap(map.key);
  }

  setTileset(tiles: Asset) {
    const tileset = this.tilemap.addTilesetImage(tiles.key);
    if (!tileset) {
      throw new Error("Tileset not found");
    }
    return tileset;
  }

  addLayers() {
    this.layers.forEach((layer) => {
      this.tilemap.createLayer(layer, this.tileset);
    });
  }

  generateMatrix() {
    return generateMatrixFromLevel(this.tilemap, this.collisionLayers);
  }

  goTo(player: Player, position: Phaser.Math.Vector2) {
    const targetPosition = this.tilemap.worldToTileXY(position.x, position.y);
    const playerPosition = this.tilemap.worldToTileXY(player.x, player.y);
    if (targetPosition && playerPosition) {
      console.log(this.matrix, playerPosition, targetPosition);
      const path = findPath(this.matrix, playerPosition, targetPosition);
      if (path) {
        player.moveTo(path);
      }
    }
  }
}
