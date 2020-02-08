import * as THREE from 'three/build/three.module';

export default (scene) => {
  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(20, 20, 50);
  light.castShadow = true;
  light.intensity = 3;
  //设置阴影分辨率
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);
  return light
}

