import * as THREE from 'three/build/three.module';

function getPerson(scene){
  let material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
  });

  let sphereGeometry = new THREE.SphereGeometry(1.6, 12, 6);
  let sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(0,7,0);

  let geometry = new THREE.Geometry();

  let cylinderGeometry1 = new THREE.CylinderGeometry(1.5, 1.2, 2);
  let cylinderGeometry2 = new THREE.CylinderGeometry(1.2, 2, 4);
  let cylinder1 = new THREE.Mesh(cylinderGeometry1, material);
  let cylinder2 = new THREE.Mesh(cylinderGeometry2, material);
  cylinder1.position.set(0, 3, 0);
  cylinder2.position.set(0, 0, 0);

  cylinder1.updateMatrix();
  cylinder2.updateMatrix();
  sphere.updateMatrix();
  geometry.merge(sphere.geometry, sphere.matrix);
  geometry.merge(cylinder1.geometry, cylinder1.matrix);
  geometry.merge(cylinder2.geometry, cylinder2.matrix);
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 6;
  // mesh.rotation.x = Math.PI/2;

  // scene.add(sphere);
  // scene.add(cylinder1);
  console.log(mesh);

  mesh.name = 'person';
  scene.add(mesh);
  // return sphere;
  return mesh
}

export default getPerson;
