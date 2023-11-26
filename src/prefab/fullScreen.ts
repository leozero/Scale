export class FullScreen {
  private screenWidth: number;
  private screenHeight: number;
  private centerX: number;
  private centerY: number;

  constructor(scene: Phaser.Scene) {
    const { width, height, centerX, centerY } = scene.cameras.main;
    this.screenWidth = width;
    this.screenHeight = height;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  public getScreenWidth() {
    return this.screenWidth;
  }

  public getScreenHeight() {
    return this.screenHeight;
  }

  public getCenterX() {
    return this.centerX;
  }

  public getCenterY() {
    return this.centerY;
  }
}
