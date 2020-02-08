import { TrackballControls  } from 'three/examples/jsm/controls/TrackballControls';

export default (camera, renderer) => {
  let trackballControls = new TrackballControls(camera, renderer.domElement);
  trackballControls.rotationSpeed = 1.0;
  trackballControls.panSpeed = 1.0;
  trackballControls.zoomSpeed = 1.0;

  return trackballControls;
}


