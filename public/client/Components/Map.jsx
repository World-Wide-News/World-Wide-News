/* eslint-disable no-loop-func */
// import mapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import mapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

mapboxGl.accessToken = 'pk.eyJ1IjoibGlhbWZvbnRlcyIsImEiOiJja3RsbzdjdmQxeGZxMnBwODJ1aWlpMjgwIn0.tQGIes1AYOO8KIoAJYHTzQ';

function Map(props) {
  const { setCurrentCountryClick, getPosts } = props;

  let popup;
  let populationData;
  let previousCountryHover;
  let previousCountryClicked;

  const map = useRef(null);

  const fetchPopulationData = async (countryName) => {
    try {
      const res = await fetch(`/api/population/${countryName}`);
      const popData = await res.json();
      return popData;
    } catch (err) {
      console.log(err);
    }
  };

  const removePopups = () => {
    const popups = document.querySelectorAll('.mapboxgl-popup');
    if (popups.length > 1) {
      popups.forEach((element) => {
        element.remove();
      });
    }
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxGl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.977137, 40.764626],
      zoom: 1,
    });

    let hoveredCountryId = null;
    let clickCountryId = null;

    const randomNum = Math.random() * 255;

    const MAPSOURCE = 'country-boundaries';
    const MAP_ID = 'undisputed country boundary fill';
    const MAP_ID2 = 'disputed country boundary fill';
    const MAP_ID3 = 'disputed country boundary line';
    const MAP_SOURCE_LAYER = 'country_boundaries';
    const MAP_URL = 'mapbox://mapbox.country-boundaries-v1';

    const colorArrFillHoverTrue = [
      `rgba(${255}, ${0}, ${0}, 1)`,
      `rgba(${0}, ${255}, ${0}, 1)`,
      `rgba(${0}, ${0}, ${255}, 1)`,
      `rgba(${100}, ${0}, ${100}, 1)`,
      `rgba(${255}, ${0}, ${25}, 1)`,
      `rgba(${0}, ${200}, ${25}, 1)`,
    ];

    const colorArrFillHoverFalse = [
      `rgba(${255}, ${0}, ${0}, 0.5)`,
      `rgba(${0}, ${255}, ${0}, 0.5)`,
      `rgba(${0}, ${0}, ${255}, 0.5)`,
      `rgba(${100}, ${0}, ${100}, 0.5)`,
      `rgba(${255}, ${0}, ${25}, 0.5)`,
      `rgba(${0}, ${200}, ${25}, 0.5)`,
    ];

    map.current.on('load', () => {
      map.current.addSource(MAPSOURCE, {
        type: 'vector',
        url: MAP_URL,
      });

      for (let i = 1; i <= 6; i++) {
        map.current.addLayer({
          id: `${MAP_ID}+${i}`,
          type: 'fill',
          source: MAPSOURCE,
          'source-layer': MAP_SOURCE_LAYER,
          filter: [
            '==',
            [
              'get',
              'color_group',
            ],
            i,
          ],
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'clicked'], false], colorArrFillHoverTrue[i - 1],
              colorArrFillHoverFalse[i - 1]],
            'fill-outline-color': [
              'case',
              ['boolean', ['feature-state', 'clicked'], false], `rgba(${0}, ${0}, ${0}, 1)`, `rgba(${255}, ${255}, ${255}, 0.5)`],
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false], 1, 0.5],

          },
        });

        map.current.on('mouseenter', `${MAP_ID}+${i}`, () => {
          removePopups();
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', `${MAP_ID}+${i}`, () => {
          map.current.getCanvas().style.cursor = '';
          removePopups();
        });

        // 'mapboxgl-popup mapboxgl-popup-anchor-bottom popup';

        // eslint-disable-next-line no-loop-func
        map.current.on('mousemove', `${MAP_ID}+${i}`, (e) => {
          removePopups();
          const countryName = e.features[0].properties.name_en;
          if (e.features.length > 0) {
            if (hoveredCountryId !== null) {
              map.current.setFeatureState(
                {
                  source: MAPSOURCE,
                  sourceLayer: MAP_SOURCE_LAYER,
                  id: hoveredCountryId,
                },
                { hover: false },
              );
            }
            hoveredCountryId = e.features[0].id;
            if (previousCountryHover !== hoveredCountryId) {
              fetchPopulationData(countryName)
                .then((data) => {
                  populationData = data;
                  popup = new mapboxGl.Popup({ closeOnMove: true })
                    .setLngLat([e.lngLat.lng, e.lngLat.lat])
                    .setHTML(`
                  <p>Country: ${countryName} </p><p>Population: ${populationData.toLocaleString()} </p>`)
                    .addTo(map.current);
                  popup.addClassName('popup');
                })
                .catch((err) => console.log(err));
            } else {
              popup = new mapboxGl.Popup({ closeOnMove: true })
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setHTML(`
                <p>Country: ${countryName} </p><p>Population: ${populationData.toLocaleString()} </p>`)
                .addTo(map.current);
              popup.addClassName('popup');
            }
            previousCountryHover = hoveredCountryId;

            map.current.setFeatureState(
              {
                source: MAPSOURCE,
                sourceLayer: MAP_SOURCE_LAYER,
                id: hoveredCountryId,
              },
              { hover: true },
            );
          }
        });

        map.current.on('click', `${MAP_ID}+${i}`, (e) => {
          clickCountryId = e.features[0].id;
          const countryName = e.features[0].properties.name_en;
          if (clickCountryId !== previousCountryClicked) {
            setCurrentCountryClick(countryName);
            getPosts(countryName);
            previousCountryClicked = clickCountryId;
          }

          map.current.setFeatureState(
            {
              source: MAPSOURCE,
              sourceLayer: MAP_SOURCE_LAYER,
              id: clickCountryId,
            },
            { clicked: true },
          );
          setTimeout(() => {
            map.current.setFeatureState(
              {
                source: MAPSOURCE,
                sourceLayer: MAP_SOURCE_LAYER,
                id: clickCountryId,
              },
              { clicked: false },
            );
          }, 100);
        });
      }
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

      map.current.addLayer({
        id: MAP_ID3,
        type: 'line',
        source: MAPSOURCE,
        'source-layer': MAP_SOURCE_LAYER,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 1,
        },
      });
    });
  });

  return (
    <div id="mapContainer" />
  );
}

Map.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  setCurrentCountryClick: PropTypes.any.isRequired,
  getPosts: PropTypes.func.isRequired,
};
export default Map;
