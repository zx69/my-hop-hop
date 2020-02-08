import * as Stats from 'stats.js';

export default () => {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'fixed';
  stats.domElement.style.left = '10px';
  stats.domElement.style.top = '10px';
  document.body.appendChild(stats.domElement);

  return stats;
}
