import * as THREE from 'three/build/three.module';

export default (scene) => {
  let axes = new THREE.AxesHelper(20);
  scene.add(axes);
}
