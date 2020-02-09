import * as THREE from 'three/build/three.module';
// import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json'; // 引入字体

// let loader = new THREE.FontLoader();

// let options = {
//   size: 5,
//   height: 1,
//   weight: 'normal',
//   style: 'normal',
//   font: loader.parse(helvetikerFont),
// }

function generateCanvasText(text) {
  let canvas = document.createElement( 'canvas' );
  canvas.width = 1000;
  canvas.height = 100;
  canvas.style.background = 'rgba(0,0,0,0.5)';

  let context = canvas.getContext( '2d' );
  context.beginPath();
  context.font = '60px Microsoft YaHei';
  context.fillStyle = 'pink';
  context.fillText(text,0,50);
  context.fill();
  // context.stroke();
  return canvas;
}


export default (scene) => {
  // let textMaterial = new THREE.MeshPhongMaterial({
  //   color: 0x00ff00,
  // });
  // // loader.load('fonts/helvetiker_regular.typeface.json', function (res) {
  // //   console.log(res);
  // //   options.font = res;
  //   let textGeometry = new THREE.TextGeometry('GameOver', options);
  //   let textMesh = new THREE.Mesh(textGeometry, textMaterial);
  //   scene.add(textMesh);
  //   return textMesh
  // // });

  let texture = new THREE.CanvasTexture(generateCanvasText('Game Over'));
  let material = new THREE.SpriteMaterial({
    map: texture,

    // blending: THREE.AdditiveBlending,
  });
  // let geometry = new THREE.PlaneBufferGeometry(5, 5, 10);
  let text = new THREE.Sprite(material);
  text.scale.set(100,10)
  scene.add(text);
  return text;
}
