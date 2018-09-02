import mapboxgl from 'mapbox-gl'
import React from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXN0cm9ldHoiLCJhIjoiQmp3RjlaZyJ9.7JCU4lzvAzfijEV129QFiQ'

class Map extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [10.1299, 51.3401],
      zoom: 5.1
    })

    map.on('load', () => {
      map.addSource('cities-aqu61x', {
        type: 'vector',
        url: 'mapbox://ustroetz.6bwcskwk'
      })

      map.addLayer({
        id: 'cities-aqu61x',
        type: 'circle',
        source: 'cities-aqu61x',
        'source-layer': 'cities-aqu61x'
      })

      map.setFilter('cities-aqu61x', [
        'all',
        ['>=', 'population', 50000],
        ['<=', 'population', 250000],
        ['!=', 'featureCode', 'PPLX']
      ])
    })

    map.on('click', 'cities-aqu61x', function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var name = e.features[0].properties.name
      var population = e.features[0].properties.population

      console.log(e.features[0].properties)

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(name + ' (' + population + ')')
        .addTo(map)
    })
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }

    return <div style={style} ref={el => (this.mapContainer = el)} />
  }
}

export default Map
