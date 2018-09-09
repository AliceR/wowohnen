import mapboxgl from 'mapbox-gl'
import React from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXN0cm9ldHoiLCJhIjoiQmp3RjlaZyJ9.7JCU4lzvAzfijEV129QFiQ'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { map: null }
  }

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
        'source-layer': 'cities-aqu61x',
        paint: {
          'circle-color': 'teal'
        }
      })

      map.setFilter('cities-aqu61x', [
        'all',
        ['>=', 'population', this.props.min],
        ['<=', 'population', this.props.max],
        ['!=', 'featureCode', 'PPLX']
      ])
    })

    map.on('click', 'cities-aqu61x', function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var name = e.features[0].properties.name
      var population = e.features[0].properties.population

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(name + ' (' + population.toLocaleString() + ')')
        .addTo(map)
    })

    this.setState({ map: map })
  }

  componentDidUpdate(prevProps) {
    if (this.props.min !== prevProps.min || this.props.max !== prevProps.max) {
      this.state.map.setFilter('cities-aqu61x', [
        'all',
        ['>=', 'population', this.props.min],
        ['<=', 'population', this.props.max],
        ['!=', 'featureCode', 'PPLX']
      ])
    }
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
