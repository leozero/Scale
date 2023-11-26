import { TILE_SIZE } from "../constants";
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

  updateMatrix(x: number, y: number, width: number, height: number) {
    const row = {
      start: x,
      end: x + width / TILE_SIZE,
    };
    const column = {
      start: y,
      end: y + height / TILE_SIZE,
    };
    for (let i = column.start; i < column.end; i++) {
      for (let j = row.start; j < row.end; j++) {
        this.matrix[i][j] = 1;
      }
    }
  }

  debugMatrix() {
    const debug = this.scene.add.graphics();
    debug.fillStyle(0xff0000, 0.5);
    this.matrix.forEach((row, i) => {
      row.forEach((column, j) => {
        if (column === 1) {
          debug.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      });
    });
  }

  goTo(
    player: Player,
    position: Phaser.Math.Vector2,
    isTargetTileFormat = false,
    callback: () => void = () => {}
  ) {
    if (!player.canMove) return;
    const targetPosition = isTargetTileFormat
      ? position
      : this.tilemap.worldToTileXY(position.x, position.y);
    const playerPosition = this.tilemap.worldToTileXY(player.x, player.y);
    if (targetPosition && playerPosition) {
      const path = findPath(this.matrix, playerPosition, targetPosition);
      if (path && path.length > 1) {
        player.moveTo(path, callback);
      }
    }
  }
}
