import * as THREE from 'three/build/three.module';

function getPlane(scene) {
  let material = new THREE.MeshLambertMaterial({
    // color: 'pink',
    // shadowDarkness: 1,
    // shininess: 1,
    // emissive: 0xeeeeee,
    transparent: true,
    opacity: 0,
  });
  let geometry = new THREE.PlaneGeometry(1000,1000);
  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI/2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

export default getPlane;
