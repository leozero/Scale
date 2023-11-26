import { FullScreen } from "./fullScreen";
import { Gradient } from "./gradient";
import { assets } from "../constants";

export class ShopMenu extends FullScreen {
  scene: Phaser.Scene;
  gradient: Gradient;
  graphics: Phaser.GameObjects.Graphics;
  trader: Phaser.GameObjects.Sprite | undefined;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;
    this.gradient = new Gradient(scene);
    this.graphics = scene.add.graphics();
  }

  get graphicsWidth() {
    return this.getScreenWidth() * 0.4;
  }

  get graphicsHeight() {
    return this.getScreenHeight() * 0.4;
  }

  draw() {
    const width = this.graphicsWidth;
    const height = this.graphicsHeight;
    this.graphics.fillStyle(0xf6a356);
    this.graphics.fillRect(0, 0, width, height);
    this.graphics.setScrollFactor(0);
    this.graphics.setDepth(100);
    this.graphics.x = this.getCenterX() - width / 2;
    this.graphics.y = this.getCenterY() - height / 2;
    this.addTrader();
  }

  addTrader() {
    const SCALE = 2;
    this.trader = this.scene.add.sprite(
      this.graphics.x,
      this.graphics.y + this.graphicsHeight,
      assets.trader.key
    );
    this.trader.y -= this.trader.height * SCALE;
    this.trader.setScrollFactor(0);
    this.trader.setOrigin(0, 0);
    this.trader.setDepth(101);
    this.trader.setScale(SCALE);
    const text = this.scene.add.text(
      this.graphics.x + 10,
      this.graphics.y + 20,
      "Welcome to\nthe shop!",
      {
        fontSize: "16px",
        color: "#000",
      }
    );
    text.setScrollFactor(0);
    text.setDepth(101);
  }

  destroy() {
    this.gradient.destroy();
  }
}
