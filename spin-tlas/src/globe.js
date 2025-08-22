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
    // .then(res => res.json())
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(countries => {

      globe
        // build the polygons from the coords set 
        .polygonsData(countries.features)

        // display name on hover 
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

          if (clickedD && clickedD.properties) {
            const countryName = clickedD.properties.name;
            const countryCode = clickedD.id; 
            
            console.log(`${countryCode} - ${countryName}`);
            
            if (countryCode) {
              const fetchUrl = `http://localhost:3000/news?country=${countryCode}`;
              console.log('Attempting to fetch:', fetchUrl);
              
              fetch(fetchUrl)
                .then(response => {
                  console.log("status",response.status);
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('fetched data:', data);
                  // display logic goes here
                })
                .catch(error => {
                  console.error(error);
                });
            } else {
              console.warn('Country code not found for this region.');
            }
          } else {
            console.warn('false polygon data');
          }
        });

      console.log('Loaded countries:', countries.features.length);
    })
    .catch(error => {
      console.error('Failed to load', error);
    })
    
  return { globe };
}

export function setTheme(theme) {
  document.body.classList.remove('vintage', 'modern');
  document.body.classList.add(theme);

  if (!globe) return;

  globe.globeImageUrl(theme === 'vintage' ? earthVintage : earthModern);
}
