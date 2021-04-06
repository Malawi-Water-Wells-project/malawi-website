import React, { PureComponent, RefObject } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";

type MapSearchProps = {};

class MapSearch extends PureComponent<MapSearchProps> {
  mapRef: RefObject<HTMLDivElement>;
  map: atlas.Map | null = null;

  constructor(props: MapSearchProps) {
    super(props);
    this.mapRef = React.createRef();
  }

  async componentDidMount() {
    if (!this.mapRef.current) return;

    this.map = new atlas.Map(this.mapRef.current, {
      disableTelemetry: true,
      center: await this.getCenter(),
      zoom: 6,
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: "rBlQMSCRWQw7G28PdIzb9njUzj3_HYDt_j9u4bzyuWY",
      },
    });

    this.map.events.add("click", this.handleMapClick);
  }

  private handleMapClick = (event: atlas.MapMouseEvent) => {
    if (!event.position) return;

    const dataSource = new atlas.source.DataSource();

    this.map?.sources.add(dataSource);

    const point = new atlas.Shape(new atlas.data.Point(event.position));
    dataSource.add(point);

    this.map?.layers.add(new atlas.layer.SymbolLayer(dataSource));
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

  render() {
    return <div className="search-map" ref={this.mapRef} />;
  }
}

export default MapSearch;
