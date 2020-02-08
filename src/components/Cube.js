import * as THREE from 'three/build/three.module';

function Cube(color, z, x, height = 4){
  let material = new THREE.MeshLambertMaterial({
    color,
    // emissive: 0xcccccc,
  });
  let geometry = new THREE.CubeGeometry(10, height, 10);

  let cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, height/2, z);
  cube.castShadow = true;
  return cube;
}


export default Cube
