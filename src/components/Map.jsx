import React from "react";
import ReactMapGL, {
  Source,
  Layer,
} from "react-map-gl";

const MAPBOX_TOKEN = `pk.eyJ1Ijoiam9obmNsYXJ5IiwiYSI6ImNrM29wNnB3dDAwcXEzY29zMTU5bWkzOWgifQ.KKvoz6s4NKNHkFVSnGZonw`;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: props.data[0].latitude,
      longitude: props.data[0].longitude,
      viewport: {
        width: "100%",
        height: 500,
        latitude: props.data[0].latitude,
        longitude: props.data[0].longitude,
        zoom: 14,
      },
    };

    this.buildFeatureCollection = (x, y) => {
      return {
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "Point", coordinates: [x, y] } },
        ],
      };
    };
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Source
          id="my-layer"
          type="geojson"
          data={this.buildFeatureCollection(
            this.state.longitude,
            this.state.latitude
          )}
        >
          <Layer
            id="point"
            type="circle"
            paint={{
              "circle-radius": 12,
              "circle-color": "#eb3434",
              "circle-stroke-color": "white",
              "circle-stroke-width": 2
            }}
          />
        </Source>
      </ReactMapGL>
    );
  }
}

export default Map;
