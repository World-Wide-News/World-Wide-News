const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoibGlhbWZvbnRlcyIsImEiOiJja3RsbzdjdmQxeGZxMnBwODJ1aWlpMjgwIn0.tQGIes1AYOO8KIoAJYHTzQ';

function createMap(map, setFavorites, currentFavorites) {
  fetch('/api/map')
    .then((response) => response.json())
    .then((data) => {
      const layerList = document.getElementById('menu');
      const inputs = layerList.getElementsByTagName('input');

      for (const input of inputs) {
        input.onclick = (layer) => {
          const layerId = layer.target.id;
          map.current.setStyle(`mapbox://styles/mapbox/${layerId}`);
        };
      }
      map.current.addControl(new mapboxgl.NavigationControl());

      map.current.addControl(new mapboxgl.GeolocateControl({
        showAccuracyCircle: true,
        showUserLocation: true,
      }));

      data.forEach((element) => {
        const el = document.createElement('div');
        el.className = 'marker';
        if (element.Lines !== '9' && element.Lines !== 'S') {
          el.style.backgroundImage = `url(https://api.mta.info/lineIcons/${element.Lines}.svg)`;
        }
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.backgroundSize = '100%';
        el.id = `${element.subwayStop}`;

        el.addEventListener('dblclick', (e) => {
          fetch(`api/wikiStation/${e.target.id}`)
            .then((res) => res.json())
            .then((data) => {
              window.open(data, '_blank');
            });
        });

        el.addEventListener('click', (e) => {
          fetch(`api/station/${e.target.id}`)
            .then((res) => res.json())
            .then((data) => {
              const div = document.querySelector('#secret');
              div.innerHTML += `${data.stop_name} `;
            });
        });

        new mapboxgl.Marker(el)
          .setLngLat([Number(element.stop_lon), Number(element.stop_lat)])
          .addTo(map.current);
      });
    });
  // return map;
}

export default createMap;
