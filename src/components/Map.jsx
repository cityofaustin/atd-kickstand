import React from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const MAPBOX_TOKEN = `pk.eyJ1Ijoiam9obmNsYXJ5IiwiYSI6ImNrM29wNnB3dDAwcXEzY29zMTU5bWkzOWgifQ.KKvoz6s4NKNHkFVSnGZonw`;

class Map extends React.Component {
  constructor(props) {
    super(props);
    const data = props.data[props.root_key][0];
    this.state = {
      latitude: data.latitude,
      longitude: data.longitude,
      viewport: {
        width: "100%",
        height: 250,
        latitude: data.latitude,
        longitude: data.longitude,
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
      <Row className="mb-2">
        <Col>
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
                  "circle-stroke-width": 2,
                  "circle-opacity": 0.7,
                }}
              />
            </Source>
          </ReactMapGL>
        </Col>
      </Row>
    );
  }
}

export default Map;
