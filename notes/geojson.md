🔧 Tools & Libraries Used

*Three.js Three-Globe

3D rendering of globes with features - wrap images, mark shapes, label, color..

________________________________________________

📁 Data Used: countries.geo.json

GeoJSON is a specialized format of JSON for encoding geographic data structures.

It includes:

type: "Feature" 
    features: Array of features, each with:
        properties: like name, population..

geometry: actual shape — "Polygon" for single spread or "MultiPolygon" for multi

coordinates: [lng, lat] pairs

_______________________________________________

📦 D3.js -> d3-geo is a module in the D3.js library that provides geospatial functions — it helps you work with geographic data like latitudes, longitudes, and map projections.

It helps with:
        Projecting geo coordinates (lat/lng) into 2D/3D space:
        You can convert [longitude, latitude] into x, y points on screen.
        Calculating geometry-related properties, like:
            geoCentroid(feature) → Finds the center point of a polygon (used for placing labels).
            geoPath() → Converts a GeoJSON shape into a SVG path.

_______________________________________________