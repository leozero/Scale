import { FullScreen } from "./fullScreen";

export class Gradient extends FullScreen {
  graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.graphics = scene.add.graphics();
    this.draw();
  }

  draw() {
    this.graphics.fillStyle(0x000000, 0.5);
    this.graphics.fillRect(0, 0, this.getScreenWidth(), this.getScreenWidth());
    this.graphics.setScrollFactor(0);
    this.graphics.setDepth(50);
  }

  destroy() {
    this.graphics.destroy();
  }
}
