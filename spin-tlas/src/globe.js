import Globe from 'globe.gl';
import * as d3 from 'd3-geo';

import earthVintage from './assets/vintage.jpg';
import earthModern from './assets/dark.jpg';

let globe;

export function setupGlobe(element) {
  globe = Globe();
  globe(element)
    .globeImageUrl(earthModern)
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .polygonAltitude(0.01)
    .polygonCapColor(() => 'rgba(255, 255, 255, 0.15)')
    .polygonSideColor(() => 'rgba(0, 100, 255, 0.05)');

  // Load GeoJSON dynamically
  fetch('src/assets/world.geojson')
    .then(res => res.json())
    .then(countries => {
      globe
        .polygonsData(countries.features)

        // LABELS
        // .labelsData(countries.features)
        // .labelLat(d => d3.geoCentroid(d)[1])
        // .labelLng(d => d3.geoCentroid(d)[0])
        // .labelText(d => d.properties.name

        .onPolygonHover(hoverD => {
          const region = document.getElementById('region');

          if (hoverD) {
            document.body.style.cursor = 'pointer';
            region.textContent = hoverD.properties.name;
            region.style.opacity = 1;

            const [centroidLon, centroidLat] = d3.geoCentroid(hoverD);
            const screenCoords = globe.getScreenCoords(centroidLat, centroidLon);

            region.style.left = `${screenCoords.x}px`;
            region.style.top = `${screenCoords.y}px`;
            region.style.transform = 'translate(-50%, -50%)';

            console.log('Hovered:', hoverD.properties.name);
          } else {
            document.body.style.cursor = 'auto';
            region.textContent = '';
            region.style.opacity = 0;
          }
        })

        .onPolygonClick(clickedD => {
          console.log('Clicked:', clickedD.properties.name);
        });

      console.log('Loaded countries:', countries.features.length);
    });

  // The animation loop is handled by globe.gl

  // AutoRotate
  // const rotationSpeed = 0.0015;
  // function animate() {
  //   globe.rotation(globe.rotation()[0], globe.rotation()[1] + rotationSpeed, globe.rotation()[2]);
  //   requestAnimationFrame(animate);
  // }
  // animate();
  return { globe };
}

export function setTheme(theme) {
  document.body.classList.remove('vintage', 'modern');
  document.body.classList.add(theme);

  if (!globe) return;

  globe.globeImageUrl(theme === 'vintage' ? earthVintage : earthModern);
}
