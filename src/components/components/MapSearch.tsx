import React, { ChangeEvent, FormEvent, PureComponent, RefObject } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";
import { Button, Form, Table } from "react-bootstrap";
import APIClient from "../../core/APIClient";
import { Tribe } from "../../types/TribeTypes";

type MapSearchProps = {
  onSearch: () => void;
  onResults: (tribes: Array<Tribe>) => void;
};

type MapSearchState = {
  pinLocation: [number, number];
  radius: number;
};

class MapSearch extends PureComponent<MapSearchProps, MapSearchState> {
  mapRef: RefObject<HTMLDivElement>;
  map?: atlas.Map;
  point = new atlas.Shape(new atlas.data.Point([0, 0]), undefined, {
    subType: "Circle",
    radius: 25000,
  });

  dataSource = new atlas.source.DataSource();

  constructor(props: MapSearchProps) {
    super(props);
    this.state = {
      pinLocation: [-1, -1],
      radius: 25000,
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    if (!this.mapRef.current) return;
    this.initMap();
  }

  private initMap = async () => {
    if (!this.mapRef.current) throw new Error("mapRef is not set.");

    const center = await this.getCenter();

    this.setState({ pinLocation: center });

    this.map = new atlas.Map(this.mapRef.current, {
      disableTelemetry: true,
      center,
      zoom: 6,
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: "rBlQMSCRWQw7G28PdIzb9njUzj3_HYDt_j9u4bzyuWY",
      },
    });
    this.map.events.add("ready", this.handleMapReady);
    this.map.events.add("click", this.handleMapClick);
  };

  private handleMapReady = () => {
    if (!this.map) return;

    // Add Search Polygon
    this.point.setCoordinates(this.state.pinLocation);
    this.point.addProperty("center", this.state.pinLocation);
    this.dataSource.add(this.point);
    this.map.sources.add(this.dataSource);
    this.map.layers.add(
      new atlas.layer.PolygonLayer(this.dataSource, undefined, {
        fillColor: "#005554",
        fillOpacity: 0.5,
      })
    );
  };

  private handleMapClick = (event: atlas.MapMouseEvent) => {
    if (!event.position) return;

    this.point.setCoordinates(event.position);

    this.setState({ pinLocation: event.position as [number, number] });
  };

  private handleRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radius = parseInt(event.target.value, 10);

    this.point.addProperty("radius", radius);
    this.setState({ radius });
  };

  private getCenter(): Promise<[number, number]> {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        resolve([34.3015, -13.2543]);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        () => resolve([34.3015, -13.2543])
      );
    });
  }

  private handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const [long, lat] = this.state.pinLocation;

    this.props.onSearch();
    APIClient.tribe
      .searchByLocation(lat, long, this.state.radius)
      .then(this.props.onResults);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Distance</Form.Label>
          <div className="search-map__distance">
            <p className="search-map__distance-label">1km</p>
            <Form.Control
              type="range"
              min={1000}
              max={100000}
              step={1000}
              defaultValue={25000}
              onChange={this.handleRadiusChange}
            />
            <p className="search-map__distance-label">100km</p>
          </div>
        </Form.Group>
        <div className="search-map" id="search-map" ref={this.mapRef} />
        <h3 className="page-heading">Search Details</h3>
        <Table className="search-map__table" size="sm">
          <tbody>
            <tr>
              <td>Latitude</td>
              <td>{this.state.pinLocation[1].toFixed(4)}&deg;N</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>{this.state.pinLocation[0].toFixed(4)}&deg;E</td>
            </tr>
            <tr>
              <td>Search Radius</td>
              <td>{this.state.radius / 1000}km</td>
            </tr>
          </tbody>
        </Table>
        <Button type="submit">Search</Button>
      </Form>
    );
  }
}

export default MapSearch;
