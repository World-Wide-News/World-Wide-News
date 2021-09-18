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

    let hoveredStateId = null;
    const randomNum = Math.random() * 255;

    const MAPSOURCE = 'country-boundaries';
    const MAP_ID = 'undisputed country boundary fill';
    const MAP_ID2 = 'disputed country boundary fill';
    const MAP_SOURCE_LAYER = 'country_boundaries';
    const MAP_URL = 'mapbox://mapbox.country-boundaries-v1';

    map.current.on('load', () => {
      map.current.addSource(MAPSOURCE, {
        type: 'vector',
        url: MAP_URL,
      });
      map.current.addLayer({
        id: MAP_ID,
        type: 'fill',
        source: MAPSOURCE,
        'source-layer': MAP_SOURCE_LAYER,
        filter: [
          '==',
          [
            'get',
            'disputed',
          ],
          'false',
        ],
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'clicked'], false], `rgba(${0}, ${0}, ${255}, 0.5)`, `rgba(${0}, ${255}, ${0}, 0.5)`],
          'fill-outline-color': [
            'case',
            ['boolean', ['feature-state', 'clicked'], false], `rgba(${0}, ${0}, ${0}, 1)`, `rgba(${255}, ${255}, ${255}, 0.5)`],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 1, 0.0],

        },
      });

      map.current.addLayer({
        id: MAP_ID2,
        type: 'fill',
        source: MAPSOURCE,
        'source-layer': MAP_SOURCE_LAYER,
        filter: [
          '==',
          [
            'get',
            'disputed',
          ],
          'true',
        ],
        paint: {
          'fill-color': `rgba(${0}, ${0}, ${255}, 0.5)`,
          'fill-outline-color': `rgba(${randomNum}, ${randomNum}, ${randomNum}, 1)`,
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 1, 0.5],

        },
      });

      map.current.on('mouseenter', MAP_ID, () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', MAP_ID, () => {
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('mousemove', MAP_ID, (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              {
                source: MAPSOURCE,
                sourceLayer: MAP_SOURCE_LAYER,
                id: hoveredStateId,
              },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
            {
              source: MAPSOURCE,
              sourceLayer: MAP_SOURCE_LAYER,
              id: hoveredStateId,
            },
            { hover: true },
          );
        }
      });
      map.current.on('click', MAP_ID, (e) => {
        const clickedStateId = e.features[0].id;
        map.current.setFeatureState(
          {
            source: MAPSOURCE,
            sourceLayer: MAP_SOURCE_LAYER,
            id: clickedStateId,
          },
          { clicked: true },
        );
        setTimeout(() => {
          map.current.setFeatureState(
            {
              source: MAPSOURCE,
              sourceLayer: MAP_SOURCE_LAYER,
              id: clickedStateId,
            },
            { clicked: false },
          );
        }, 100);
        console.log(e.features[0]);
      });
    });
  });

  return (
    <div id="mapContainer" />
  );
}
export default Map;
