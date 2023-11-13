import Phaser from "phaser";
import { Player } from "../prefab/player";
import { LEVELS, assets, humanLayers } from "../constants";
import { Level } from "../lib/level";
import { loadAssets } from "../lib/loader";

export default class Garden extends Phaser.Scene {
  player: Player | undefined;
  level: Level | undefined;
  isPlayerMoving = false;
  currentTweensChain: Phaser.Tweens.TweenChain | undefined;

  constructor() {
    super(LEVELS.GARDEN);
  }

  handleClick(pointer: Phaser.Input.Pointer) {
    const worldPoint = pointer.positionToCamera(
      this.cameras.main
    ) as Phaser.Math.Vector2;
    if (!this.player) return;
    this.level?.goTo(this.player, worldPoint);
  }

  preload() {
    const assetsToLoad = [
      assets.tileset_human,
      assets.bee_human,
      assets.map_human,
      assets.beekeeper_female,
    ];

    loadAssets(this, assetsToLoad);
  }

  create() {
    this.level = new Level(
      this,
      assets.map_human,
      assets.tileset_human,
      humanLayers,
      ["Obstacles", "Day"]
    );

    this.player = new Player(this, 32, 32);

    this.level.setCamera(this.player);
    this.input.on("pointerdown", this.handleClick, this);
  }
}
