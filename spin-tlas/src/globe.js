import * as THREE from 'three';
import Globe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as d3 from 'd3-geo'; 

import earthVintage from './assets/vintage.jpg';
import earthModern from './assets/dark.jpg';

import countries from './assets/countries.geo.json'; 

let globe;

let polygonObjs = [];
let mouseX = 0, mouseY = 0; 

export function setupGlobe(element) {
  // Scene setup
  const scene = new THREE.Scene();

  // Camera 
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  // Renderer - creates own canvas 
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Create globe
  globe = new Globe()
    .globeImageUrl(earthModern)
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .polygonsData(countries.features)

    .polygonAltitude(0.01)
    .polygonCapColor(() => 'rgba(255, 255, 255, 0.15)') // main areas
    .polygonSideColor(() => 'rgba(0, 100, 255, 0.05)') // edges or sides

    .labelsData(countries.features)
    .labelLat(d => d3.geoCentroid(d)[1])
    .labelLng(d => d3.geoCentroid(d)[0])
    .labelText(d => d.properties.name)
    .labelSize(1.2)
    .labelColor(() => 'white')
    .labelResolution(2);

  scene.add(globe);
  // * 
  console.log(globe.polygonsData());
  console.log('GeoJSON Features:', countries.features.length);
  console.log("hyuhu",countries.features[0].geometry.coordinates);

  // Light - full surface
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  setTimeout(() => {
    // polygonObjs = globe.polygonsData().map(p => p.__threeObj).filter(Boolean);
    console.log('yo yo yo polygonObjs:', polygonObjs.length); 

    animate();
  }, 100); // delay gives time for __threeObj to be attached


  // Animation 
  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.0015; // constant slow spin

    if (polygonObjs.length > 0) {
      const intersects = raycaster.intersectObjects(polygonObjs, true);
      console.log('intersects:', intersects);

      if (intersects.length > 0) {
        const intersected = intersects[0].object.__data;

        // is same country being hovered?
        if (INTERSECTED !== intersected) {
          INTERSECTED = intersected;
          tooltipDiv.innerText = INTERSECTED.properties.name;
          tooltipDiv.style.display = 'block';
        }
        tooltipDiv.style.left = `${mouseX + 10}px`;
        tooltipDiv.style.top = `${mouseY + 10}px`;
      } else {
        INTERSECTED = null;
        tooltipDiv.style.display = 'none';
      }
    }

    renderer.render(scene, camera);
  }
}

export function setTheme(theme) {
  document.body.classList.remove('vintage', 'modern');
  document.body.classList.add(theme);

  if (!globe) return;

  globe.globeImageUrl(theme === 'vintage' ? earthVintage : earthModern);
}
