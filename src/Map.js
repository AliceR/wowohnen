import mapboxgl from 'mapbox-gl'
import React from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXN0cm9ldHoiLCJhIjoiQmp3RjlaZyJ9.7JCU4lzvAzfijEV129QFiQ'

class Map extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [10.1299, 51.3401],
      zoom: 5.1
    })

    this.map.on('load', () => {
      this.map.addSource('cities-1tb0p9', {
        type: 'vector',
        url: 'mapbox://ustroetz.4esy0wuq'
      })

      this.map.addLayer({
        id: 'cities-1tb0p9',
        type: 'circle',
        source: 'cities-1tb0p9',
        'source-layer': 'cities-1tb0p9'
      })
    })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    const style = {
      position: 'absolute',
      top: 64,
      bottom: 0,
      width: '100%',
      zIndex: -1
    }

    return <div style={style} ref={el => (this.mapContainer = el)} />
  }
}

export default Map
