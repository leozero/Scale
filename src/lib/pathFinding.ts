import PF from "pathfinding";
import { Matrix } from "../types";

const canCollide = (tiles: (Phaser.Tilemaps.Tile | null)[]): boolean => {
  return tiles.some((tile) => tile?.properties.isSolid);
};

export const generateMatrixFromLevel = (
  level: Phaser.Tilemaps.Tilemap,
  layers: string[]
): Matrix => {
  const matrix: Matrix = [[]];

  for (let y = 0; y < level.height; y++) {
    matrix[y] = [];
    for (let x = 0; x < level.width; x++) {
      const tiles = layers.map((layer) => level.getTileAt(x, y, false, layer));

      matrix[y][x] = canCollide(tiles) ? 1 : 0;
    }
  }

  return matrix;
};

export const findPath = (
  matrix: Matrix,
  from: Phaser.Math.Vector2,
  to: Phaser.Math.Vector2
) => {
  const grid = new PF.Grid(matrix);
  const finder = new PF.AStarFinder();
  return finder.findPath(from.x, from.y, to.x, to.y, grid.clone());
};
