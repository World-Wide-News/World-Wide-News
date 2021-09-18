// import mapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { useRef, useEffect, useState } from 'react';

// const geoJson = FileReader.readAsDataText('/root/World-Wide-News/public/client/Components/countries.geojson');

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoibGlhbWZvbnRlcyIsImEiOiJja3RsbzdjdmQxeGZxMnBwODJ1aWlpMjgwIn0.tQGIes1AYOO8KIoAJYHTzQ';

function Map() {
  const map = useRef(null);
  const [lng, setLng] = useState(-73.977137);
  const [lat, setLat] = useState(40.764626);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    // Add a GeoJSON source containing the country polygons.
    map.current.on('load', () => {
      map.current.addSource('states', {
        type: 'geojson',
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson',
        // data: 'http://inmagik.github.io/world-countries/countries/ITA.geojson',

      });

      // Shade all country polygons
      let hoveredStateId = null;
      const randomNum = Math.random() * 255;
      console.log(randomNum);
      map.current.addLayer({
        id: 'states-layer',
        type: 'fill',
        source: 'states',
        paint: {
          'fill-color': `rgba(${100}, ${100}, ${100}, 0.4)`,
          'fill-outline-color': `rgba(${randomNum}, ${randomNum}, ${randomNum}, 1)`,
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 1, 0.5],

        },
      });

      map.current.on('mouseenter', 'states-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.current.on('mouseleave', 'states-layer', () => {
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('mousemove', 'states-layer', (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          console.log(e.features[0])

          map.current.setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: true },
          );
        }
      });

      map.current.on('click', 'states-layer', (e) => {
        console.log(e.features[0].properties.name);
      });
    });
  });

  return (
    <div id="mapContainer" />
  );
}
export default Map;
