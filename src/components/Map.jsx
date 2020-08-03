import React from 'react';
import ReactMapGL from 'react-map-gl';
import MAP_STYLE from '../config/mapStyles.json';
const MAPBOX_TOKEN = `pk.eyJ1Ijoiam9obmNsYXJ5IiwiYSI6ImNrM29wNnB3dDAwcXEzY29zMTU5bWkzOWgifQ.KKvoz6s4NKNHkFVSnGZonw`;


class Map extends React.Component {

  state = {
    viewport: {
      width: "100%",
      height: 500,
      latitude: 30.255155,
      longitude: -97.721499,
      zoom: 14,

    },
    mapStyle: {
      version: 8,
      sources: {
          points: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [
                      {type: 'Feature', geometry: {type: 'Point', coordinates: [-97.733330, 30.266666]}}
                  ]
              }
          }
      },
      layers: [
          {
              id: 'my-layer',
              type: 'circle',
              source: 'points',
              paint: {
                  'circle-color': 'black',
                  'circle-radius': 10
              }
          }
      ]
    }
  }


  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      />
    );
  }
}

export default Map;