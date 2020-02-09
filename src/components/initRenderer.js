import * as THREE from 'three/build/three.module';

export default () => {
  let renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor('pink', 0.25);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  return renderer;
}
