import mapboxgl from 'mapbox-gl'
import React from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXN0cm9ldHoiLCJhIjoiQmp3RjlaZyJ9.7JCU4lzvAzfijEV129QFiQ'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { map: null }
  }

  getFilter() {
    const maxThreshold = 500000
    const populationMaxFilter =
      this.props.populationMax > maxThreshold
        ? ['in']
        : ['<=', 'population', this.props.populationMax]

    return [
      'all',
      ['>=', 'population', this.props.populationMin],
      populationMaxFilter,
      ['>=', 'sunshine_hours', this.props.sunshineHoursMin],
      ['<=', 'sunshine_hours', this.props.sunshineHoursMax]
    ]
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [10.1299, 51.3401],
      zoom: 5.1
    })

    map.on('load', () => {
      map.addSource('cities_processed-59mru6', {
        type: 'vector',
        url: 'mapbox://ustroetz.9fzl7st5'
      })

      const radius = [
        'interpolate',
        ['cubic-bezier', 0, 0.2, 0.4, 0.9],
        ['get', 'population'],
        0,
        0,
        5000000,
        50
      ]

      map.addLayer({
        id: 'cities_base',
        type: 'circle',
        source: 'cities_processed-59mru6',
        'source-layer': 'cities_processed-59mru6',
        paint: {
          'circle-radius': radius,
          'circle-opacity': 0.2,
          'circle-color': 'grey'
        }
      })

      map.addLayer({
        id: 'cities_highlighted',
        type: 'circle',
        source: 'cities_processed-59mru6',
        'source-layer': 'cities_processed-59mru6',
        paint: {
          'circle-radius': radius,
          'circle-opacity': 0,
          'circle-stroke-width': 3,
          'circle-stroke-color': 'teal'
        }
      })

      map.setFilter('cities_highlighted', this.getFilter())
    })

    map.on('click', 'cities_highlighted', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var name = e.features[0].properties.name
      var population = e.features[0].properties.population
      var sunshine_hours = e.features[0].properties.sunshine_hours

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          '<h3>' +
            name +
            '</h3>' +
            '🧑 ' +
            population.toLocaleString() +
            '<br/> ☀️ ' +
            sunshine_hours.toLocaleString()
        )
        .addTo(map)
    })

    this.setState({ map: map })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.populationMin !== prevProps.populationMin ||
      this.props.populationMax !== prevProps.populationMax ||
      this.props.sunshineHoursMin !== prevProps.sunshineHoursMin ||
      this.props.sunshineHoursMax !== prevProps.sunshineHoursMax
    ) {
      this.state.map.setFilter('cities_highlighted', this.getFilter())
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
