flow:
    Browser → Loads HTML
       → Executes main.js
       → Calls setupGlobe()
       → Fetches world.geojson
       → Renders 3D globe with countries
       → Sets up hover/click handlers
       → Waits for user interaction


empty return or import? tree-shakes 
skips every node 
execution does not take place

import from src 
dont use file paths

backend script:
newsapi.org -> client library Node.js 

web server:
Express.js

