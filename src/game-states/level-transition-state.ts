import {State} from "@/core/state";
import {LevelCallback} from "@/game-states/levels/level-callback";
import {getLevel2} from "@/game-states/levels/level-2";
import {getLevel3} from "@/game-states/levels/level-3";
import {drawEngine} from "@/core/draw-engine";
import {getGameStateMachine} from "@/game-state-machine";
import {gameState} from "@/game-states/game-state";
import {scores} from "@/engine/scores";
import {getLevel1} from "@/game-states/levels/level-1";
import {gameOverState} from "@/game-states/game-over-state";

class LevelTransitionState implements State {
  levels: LevelCallback[] = [getLevel3]
  currentLevelNumber = -1
  framesElapsed = 0;

  constructor() {

  }

  onEnter(levelToEnter: number) {
    if (levelToEnter > this.levels.length) {
      getGameStateMachine().setState(gameOverState)
    }
    this.currentLevelNumber = levelToEnter;
    this.framesElapsed = 0;
  }

  onUpdate(timeElapsed: number): void {
    drawEngine.clearContext();
    // TODO: increase time
    if (this.framesElapsed > 10) {
      getGameStateMachine().setState(gameState, this.levels[this.currentLevelNumber - 1])
      return;
    }
    // draw menu
    this.framesElapsed += 1;
    drawEngine.drawText(`Hole ${this.currentLevelNumber}`, 50, drawEngine.width / 2, 500);
    scores.drawScorecard();
  }
}

export const levelTransitionState = new LevelTransitionState();
