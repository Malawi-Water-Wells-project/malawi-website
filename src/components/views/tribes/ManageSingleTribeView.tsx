import React from "react";
import * as atlas from "azure-maps-control";
import { RouteComponentProps, withRouter } from "react-router-dom";
import APIClient from "../../../core/APIClient";
import { AppBreadcrumbs } from "../../../core/Constants";
import { AppStateContext } from "../../../state/StateContext";
import ReadingWidth from "../../components/ReadingWidth";
import "azure-maps-control/dist/atlas.min.css";
import TribeAdminDetails from "../../components/tribes/TribeAdminDetails";

class ManageSingleTribeView extends React.PureComponent<RouteComponentProps> {
  static contextType = AppStateContext;
  context!: React.ContextType<typeof AppStateContext>;
  mapRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const [state, dispatch] = this.context;
    const tribeID = (this.props.match.params as { tribeID: string }).tribeID;

    const shouldQuery =
      state.tribe.currentTribe === null ||
      state.tribe.currentTribe.public_id !== tribeID;

    console.log({ shouldQuery, tribeID });

    if (shouldQuery) {
      APIClient.tribe
        .getTribeByID(tribeID)
        .then((tribe) => {
          dispatch({ type: "TRIBE::SET_CURRENT_TRIBE", tribe });
          dispatch({
            type: "UI::SET_BREADCRUMBS",
            breadcrumbs: AppBreadcrumbs.MANAGE_SINGLE_TRIBE(tribe),
          });
          setImmediate(() => this.initMap());
        })
        .catch(console.error);
    } else {
      dispatch({
        type: "UI::SET_BREADCRUMBS",
        breadcrumbs: AppBreadcrumbs.MANAGE_SINGLE_TRIBE(
          state.tribe.currentTribe
        ),
      });
      this.initMap();
    }
  }

  private initMap = () => {
    const state = this.context[0];
    console.log(!this.mapRef.current || !state.tribe.currentTribe);

    if (!this.mapRef.current || !state.tribe.currentTribe) return;

    const centerCoordinates = [
      state.tribe.currentTribe.longitude,
      state.tribe.currentTribe.latitude,
    ];

    const map = new atlas.Map(this.mapRef.current, {
      disableTelemetry: true,
      zoom: 12,
      center: centerCoordinates,
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: "rBlQMSCRWQw7G28PdIzb9njUzj3_HYDt_j9u4bzyuWY",
      },
    });

    map.events.addOnce("ready", () => {
      const datasource = new atlas.source.DataSource();
      map.sources.add(datasource);
      const layer = new atlas.layer.SymbolLayer(datasource);
      map.layers.add(layer);
      datasource.add(new atlas.data.Point(centerCoordinates));
    });
  };

  render() {
    const [state] = this.context;
    const tribeID = (this.props.match.params as { tribeID: string }).tribeID;

    if (
      state.tribe.currentTribe === null ||
      state.tribe.currentTribe.public_id !== tribeID
    )
      return <>Loading...</>;

    return (
      <ReadingWidth>
        <span className="page-heading__caption">Manage a Single Tribe</span>
        <h1 className="page-heading">{state.tribe.currentTribe.name}</h1>
        <div className="display-map mt-3" id="search-map" ref={this.mapRef} />
        <TribeAdminDetails />
        <details className="details">
          <summary className="details__summary">Members</summary>
          Test
        </details>
        <details className="details">
          <summary className="details__summary">Associated Wells</summary>
          Test
        </details>
      </ReadingWidth>
    );
  }
}

export default withRouter(ManageSingleTribeView);
