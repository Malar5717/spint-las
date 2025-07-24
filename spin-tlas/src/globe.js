import * as THREE from 'three';
import Globe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import earthVintage from './assets/vintage.jpg';
import earthModern from './assets/dark.jpg';

import countries from './assets/countries.geo.json';

// Make globe accessible across functions
let globe;

export function setupGlobe(element) {
  // 1. Set up scene
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // 2. Create globe
  globe = new Globe()
                  .globeImageUrl(earthModern)  // main surface (Modern - default)
                  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')  // adds texture
                  .polygonsData(countries.features)  // defines the shapes as per the coordinates

                  // LABELS
                  .labelsData(countries.features)
                  .labelText(d => d.properties.name)
                  .labelLat(d => d3.geoCentroid(d)[1])
                  .labelLng(d => d3.geoCentroid(d)[0])
                  .labelSize(1.2)
                  .labelColor(() => 'white')
                  .labelResolution(2)

                  // COLORS
                  .polygonCapColor(() => 'rgba(255, 255, 255, 0.15)')
                  .polygonSideColor(() => 'rgba(0, 100, 255, 0.05)')
                  .polygonStrokeColor(() => 'rgba(0,0,0,0)');

  scene.add(globe);
  console.log("Globe created:");

  // 3. Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  scene.add(ambientLight);

  // 4. Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

export function setTheme(theme) {
  document.body.classList.remove('vintage', 'modern');
  document.body.classList.add(theme);

  if (!globe) return; 

  if (theme === 'vintage') {
    globe.globeImageUrl(earthVintage);
  } else {
    globe.globeImageUrl(earthModern);
  }
}

