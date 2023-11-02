import "./style.css";

import Phaser from "phaser";

import GardenScene from "./scenes/garden";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [GardenScene],
};

export default new Phaser.Game(config);
