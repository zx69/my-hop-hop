import * as THREE from 'three/build/three.module';

export default (scene) => {
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-50,50,60);
  console.log(scene);
  camera.lookAt(scene.position);
  scene.add(camera);
  return camera;
}
