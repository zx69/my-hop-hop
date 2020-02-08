import * as THREE from 'three/build/three.module';

export const getObjWrapBox = (obj, scene) => {
  let box = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
  box.setFromObject(obj);
  // scene.add(box);
  return box;
};
