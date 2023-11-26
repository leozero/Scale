import { TILE_SIZE } from "../constants";

export enum PlayerAnimation {
  IDLE = "Idle",
  WALK = "Walk",
}

export enum PlayerDirection {
  FRONT = "front",
  BACK = "back",
  SIDE = "side",
}

export const PLAYER_SPRITE_NAME = "beekeeper_female";

export class Player extends Phaser.GameObjects.Sprite {
  public currentAnimation = PlayerAnimation.IDLE;
  public currentDirection = PlayerDirection.FRONT;
  public animations: Phaser.Animations.Animation[];
  public currentTweensChain?: Phaser.Tweens.TweenChain;
  public moving = false;
  canMove = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x * TILE_SIZE, y * TILE_SIZE, PLAYER_SPRITE_NAME, 0);
    scene.add.existing(this);
    this.animations = scene.anims.createFromAseprite(PLAYER_SPRITE_NAME);
    this.setOrigin(0, 0.5);
    this.play({ key: this.animationWithDirection, repeat: -1 });
    this.setDepth(5);
  }

  get animationWithDirection(): string {
    return `${this.currentAnimation}_${this.currentDirection}`;
  }

  changeCurrentAnimation(
    animation: PlayerAnimation,
    direction: PlayerDirection = this.currentDirection
  ) {
    if (
      this.currentAnimation !== animation ||
      this.currentDirection !== direction
    ) {
      this.currentAnimation = animation;
      this.currentDirection = direction;
      this.play({ key: this.animationWithDirection, repeat: -1 });
    }
  }

  stopCurrentAnmination() {
    this.currentTweensChain?.stop();
    this.anims.stop();
  }

  calculateDirection(horizontal: number, vertical: number) {
    if (vertical > 0) {
      return PlayerDirection.FRONT;
    } else if (vertical < 0) {
      return PlayerDirection.BACK;
    } else if (horizontal !== 0) {
      if (horizontal < 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
      return PlayerDirection.SIDE;
    }
  }

  moveTo(path: Array<Array<number>>, callback?: () => void) {
    if (!this.canMove) {
      return;
    }
    this.currentTweensChain?.stop();
    if (this.moving) {
      path.shift();
    }
    this.moving = true;
    this.currentTweensChain = this.scene.tweens.chain({
      targets: this,
      tweens: path.map((coord) => ({
        x: coord[0] * TILE_SIZE,
        y: coord[1] * TILE_SIZE,
        duration: 200,
        onActive: () => {
          const direction = this.calculateDirection(
            coord[0] * TILE_SIZE - this.x,
            coord[1] * TILE_SIZE - this.y
          );
          this.changeCurrentAnimation(PlayerAnimation.WALK, direction);
        },
      })),
    });
    this.currentTweensChain.on("complete", () => {
      this.changeCurrentAnimation(PlayerAnimation.IDLE, this.currentDirection);
      this.moving = false;
      callback?.();
    });
  }
}
