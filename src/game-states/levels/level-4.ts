import {EnhancedDOMPoint} from "@/engine/enhanced-dom-point";
import {Level} from "@/game-states/levels/level";
import {createRegularGrass} from "@/modeling/regular-grass";
import {createStartPlatform} from "@/modeling/tee-platform";
import {createSpikedGround} from "@/modeling/spiked-ground";
import {ProximityMine} from "@/modeling/proximity-mine";
import {Enemy} from "@/modeling/enemy";
import {MovingMesh} from "@/modeling/MovingMesh";
import {MoldableCubeGeometry} from "@/engine/moldable-cube-geometry";

// par 3
export function getLevel4() {
  const holePosition = new EnhancedDOMPoint(0,-.5,15);
  const respawnPoint = new EnhancedDOMPoint(0, -.5, -20);
  const cameraPosition = new EnhancedDOMPoint(0,5,-20);

  const ground = createRegularGrass(20, 50);
  ground.position.set(0,-2, 0);

  const spikes = [createSpikedGround(9, 4), createSpikedGround(9, 4), createSpikedGround(20, 4)]
  spikes[0].position.set(-5, -.5, -6);
  spikes[1].position.set(5, -.5, -6);
  spikes[2].position.set(0, -.5, 3);


  const mine = new ProximityMine(0, 0, -2.5);

  const enemies = [mine, mine.explosion] as Enemy[];

  const platform = createRegularGrass(5, 5);
  const movingPlatform = new MovingMesh(platform.geometry as MoldableCubeGeometry, platform.material, new EnhancedDOMPoint(0,.1,0), 10)
  movingPlatform.position.set(3, 2, 0);


  const meshesToCollide = [mine, ground, ...spikes, movingPlatform];
  meshesToCollide.forEach(object => object.updateWorldMatrix())


  return new Level(4, holePosition, respawnPoint, cameraPosition, meshesToCollide, enemies)
}
