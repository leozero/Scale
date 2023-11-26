import { TILE_SIZE } from "../constants";
import { Level } from "../lib/level";
import { Player, PlayerAnimation, PlayerDirection } from "./player";
import { ShopMenu } from "./shopMenu";

export enum ShopStatus {
  OPEN,
  CLOSED,
}

export class Shop extends Phaser.GameObjects.Sprite {
  public status = ShopStatus.OPEN;
  public level: Level;
  public idlePosition: Phaser.Math.Vector2;
  public player: Player;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    level: Level,
    player: Player
  ) {
    super(scene, x * TILE_SIZE, y * TILE_SIZE, "shop", 0);
    scene.add.existing(this);
    this.setOrigin(0, 0);
    this.level = level;
    this.player = player;
    this.level.updateMatrix(x, y, this.width, this.height);
    this.idlePosition = new Phaser.Math.Vector2(
      x + this.width / TILE_SIZE - 1,
      y + this.height / TILE_SIZE
    );
    this.setInteractive();

    this.on("pointerdown", this.handleClick, this);
  }

  handleClick() {
    this.level.goTo(this.player, this.idlePosition, true, () => {
      this.player.changeCurrentAnimation(
        PlayerAnimation.IDLE,
        PlayerDirection.BACK
      );
      this.player.canMove = false;
      const menu = new ShopMenu(this.scene);
    });
  }
}
