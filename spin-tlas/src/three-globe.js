//// unused. switched to different, more efficient library.

// import * as THREE from 'three';
// import Globe from 'three-globe';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as d3 from 'd3-geo'; 

// import earthVintage from './assets/vintage.jpg';
// import earthModern from './assets/dark.jpg';

// let globe;

// export function setupGlobe(element) {
//   const scene = new THREE.Scene();

//   const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.z = 400;
//   scene.add(camera);

//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   element.appendChild(renderer.domElement);

//   const controls = new OrbitControls(camera, renderer.domElement);

//   // Create globe with basic config
//   globe = new Globe()
//     .globeImageUrl(earthModern)
//     .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
//     .polygonAltitude(0.01)
//     .polygonCapColor(() => 'rgba(255, 255, 255, 0.15)')
//     .polygonSideColor(() => 'rgba(0, 100, 255, 0.05)');

//   scene.add(globe);

//   // Load GeoJSON dynamically
//   fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
//     .then(res => res.json())
//     .then(countries => {
//       globe.polygonsData(countries.features);

//       globe
//         .labelsData(countries.features)
//         .labelLat(d => d3.geoCentroid(d)[1])
//         .labelLng(d => d3.geoCentroid(d)[0])
//         .labelText(d => d.properties.name)
//         .labelSize(1.2)
//         .labelColor(() => 'white')
//         .labelResolution(2);

//       globe.onPolygonHover(hoverD => {
//           renderer.domElement.style.cursor = hoverD ? 'pointer' : '';
//           document.getElementById('region').textContent = hoverD?.properties?.name || '';
//       });

//       globe.onPolygonClick(clickedD => {
//           console.log('Clicked:', clickedD.properties.name);
//       });

//       console.log('Loaded countries:', countries.features.length);
//     });

//   // Lights
//   const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
//   scene.add(ambientLight);

//   function animate() {
//     requestAnimationFrame(animate);
//     globe.rotation.y += 0.0015;
//     renderer.render(scene, camera);
//   }

//   animate();

//   return { globe, renderer, camera, scene };
// }


// export function setTheme(theme) {
//   document.body.classList.remove('vintage', 'modern');
//   document.body.classList.add(theme);

//   if (!globe) return;

//   globe.globeImageUrl(theme === 'vintage' ? earthVintage : earthModern);
// }


