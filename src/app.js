import * as THREE from 'three/build/three.module';

import './styles/index.less';
// import initControls from './components/initControls';
import initRenderer from './components/initRenderer';
import initCamera from './components/initCamera';
import initAxes from './components/initAxes';
import initStats from './components/initStats';
import initLight from './components/initLight';
import getPerson from './components/getPerson';
import getPlane from './components/getPlane';
import Cube from './components/Cube';
import initResizeListener from './components/initResizeListener';
import { getObjWrapBox } from './utils';

var scene = new THREE.Scene();

let renderer = initRenderer();

let camera = initCamera(scene);

let plane = getPlane(scene);
let person = getPerson(scene);

let light = initLight(scene);
// light.target = plane;

initAxes(scene);
let stats = initStats();
initResizeListener(renderer, camera);
// let trackballControls = initControls(camera, renderer);


let cube = new Cube(0xcccccc, 0, 0);
scene.add(cube);

function getCubeColor(){
  return Math.random() * 0xffffff;
}
function getCubesGap(){
  return Math.round(Math.random() * 20) + 15;
}

let cube2 = new Cube(getCubeColor(), 0, getCubesGap());
scene.add(cube2);

let nextCube = cube2; // 下一个要跳转的方块
let nextCubeAlongX = true; // 下一个方块是否沿着X轴
let nextCubeGap = 0;

let boxPerson = getObjWrapBox(person, scene); // 用于计算图形相交与否, 而创建的BOX
let boxNextCube = getObjWrapBox(nextCube, scene); // 用于计算图形相交与否, 而创建的BOX

let isPressing = false; // 是否按压中
let isFallingDown = false; // 是否摔倒中

let cameraMovingDirection = 'N'; // N / X / Z
let cameraNextPosX = 0;
let cameraNextPosZ = 0;

let mouseDownTime = 0; // mouseDown触发的时间
let clickHoldDuration = 0; // 点击动作是按下时长

let hopSpeedY = 2; // 跳跃的Y方向速度
let hopSpeedX = 0; // 跳跃的X方向速度
let aY = -0.2; // Y方向的重力加速度

let hopTickTime = Math.abs(hopSpeedY / aY) * 2; // 跳跃动画执行的帧数, x2表示一上一下两程
let rotationSpeed = Math.PI * 2 / hopTickTime; // 跳跃时翻转的速度

let hopMinHeight = 6; // 跳跃的最大高度

// 屏幕按压时的帧数执行函数
let screenPressTick = () => {
  if(!isPressing){
    person.scale.set(1,1,1); // 按压结束后人恢复原形
    return;
  }
  let pressingDuration = Date.now() - mouseDownTime;

  let maxScaleX = 1.3;

  if(person.scale.x < maxScaleX){
    // 人发生形变
    person.scale.x += pressingDuration/10000;
    person.scale.z += pressingDuration/10000;
    person.scale.y -= pressingDuration/10000;
  }
}
// 小人跳跃的帧数执行函数
let personHopTick = () => {
  if(clickHoldDuration === 0){
    return;
  }
  hopSpeedX = clickHoldDuration/300;
  person.position.y += hopSpeedY;
  // console.log(nextCubeAlongX)
  if(nextCubeAlongX){
    person.position.x += hopSpeedX;
  }else{
    person.position.z -= hopSpeedX;
  }
  // person.position[nextCubeAlongX ? 'x' : 'z'] += hopSpeedX;
  person.rotation.z -= rotationSpeed;
  hopSpeedY += aY;

  // console.log(JSON.stringify(person.position));
  if(person.position.y <= hopMinHeight){
    hopSpeedY = 2;
    person.rotation.z = 0;
    clickHoldDuration = 0;

    // 计算是否碰撞
    boxPerson.setFromObject(person);
    boxNextCube.setFromObject(nextCube);
    let isIntersected = boxPerson.intersectsBox(boxNextCube);

    console.warn(isIntersected);
    if(isIntersected){
      person.position.y = hopMinHeight;

      nextCubeAlongX = Math.random() >= 0.5;
      nextCubeGap = getCubesGap();
      let nextCubeX = nextCubeAlongX ? nextCube.position.x + nextCubeGap : nextCube.position.x;
      let nextCubeZ = nextCubeAlongX ? nextCube.position.z : nextCube.position.z  - nextCubeGap;
      let newCube = new Cube(getCubeColor(), nextCubeZ, nextCubeX);
      scene.add(newCube);
      nextCube = newCube;

      cameraMovingDirection = nextCubeAlongX ? 'X' : 'Z';
      cameraNextPosX = camera.position.x + nextCubeGap;
      cameraNextPosZ = camera.position.z - nextCubeGap;



    }else{
      // person.rotation.z = -Math.PI/2;
      isFallingDown = true; // 正在跌倒中
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);

    }
  }
}

let onMouseDown = function(e){
  mouseDownTime = Date.now();
  isPressing = true;
}
let onMouseUp = (e) => {
  clickHoldDuration = Date.now() - mouseDownTime;
  isPressing = false;
}
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);

// const clock = new THREE.Clock();
let render = function render() {
  stats.update();
  personHopTick();
  screenPressTick();

  if(isFallingDown){
    if(person.rotation.z > -Math.PI/2){
      person.rotation.z -= 0.05;
    }else{
      person.rotation.z = -Math.PI/2;
    }
  }

  switch(cameraMovingDirection){
    case 'X':
      if(camera.position.x < cameraNextPosX){
        camera.position.x += 0.5;
        camera.updateProjectionMatrix();
      }else{
        cameraMovingDirection = 'N'
      }
      // camera.lookAt(scene.position);

      break;
    case 'Z':
      if(camera.position.z > cameraNextPosZ){
        camera.position.z -= 0.5;
        camera.updateProjectionMatrix();
      }else{
        cameraMovingDirection = 'N'
      }
      break;
    default: ;
  }
  // if(cameraMovingDirection){
  //   camera.position.x += nextCubeAlongX ? nextCubeGap : 0;
  //   camera.position.z -= nextCubeAlongX ? 0 : nextCubeGap;
  //   // camera.lookAt(scene.position);
  //   camera.updateProjectionMatrix();
  // }


  // trackballControls.update(clock.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();


