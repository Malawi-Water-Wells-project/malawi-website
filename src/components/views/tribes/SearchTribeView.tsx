import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import ReadingWidth from "../../components/ReadingWidth";

import MapSearch from "../../components/MapSearch";
import { Tribe } from "../../../types/TribeTypes";
import { Oval, useLoading } from "@agney/react-loading";
import { useHistory } from "react-router";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import { AppBreadcrumbs } from "../../../core/Constants";
import { useAppDispatch } from "../../../state/StateContext";

const SearchTribeView: React.FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState<Array<Tribe> | null>(null);
  const dispatch = useAppDispatch();
  const history = useHistory();
  useBreadcrumbs(AppBreadcrumbs.TRIBE_SEARCH);

  const { containerProps, indicatorEl } = useLoading({
    loading: isSearching,

    indicator: (
      <Oval
        // @ts-expect-error Typings are wrong in react-loading
        className="fade-in"
        width="25"
        style={{ marginLeft: 10 }}
      />
    ),
  });

  const handleTribeSelect = (tribe: Tribe) => {
    dispatch({ type: "TRIBE::SET_CURRENT_TRIBE", tribe });
    history.push(`/tribes/${tribe.public_id}/manage`);
  };

  return (
    <>
      <ReadingWidth className="fade-in">
        <h1 className="page-heading">Search for a tribe</h1>
        <p className="feature-text">
          You can search for a tribe by name or location.
        </p>
        <h2 className="page-heading">Search by name</h2>
        <Form>
          <Form.Group>
            <Form.Label>Tribe Name</Form.Label>
            <Form.Control id="tribe-name"></Form.Control>
          </Form.Group>
          <Button>Search</Button>
        </Form>
        <hr className="mt-4 mb-4" />
        <h2 className="page-heading">Search by location</h2>
        <p className="feature-text">
          Click anywhere on the map to set the search centre. Increase or
          decrease the search radius by using the slider below.
        </p>
        <MapSearch
          onResults={(newResults) =>
            setTimeout(() => {
              setIsSearching(false);
              setResults(newResults);
            }, 250)
          }
          onSearch={() => setIsSearching(true)}
        />
        {results !== null && (
          <div className="fade-in">
            <div
              style={{ display: "flex", alignItems: "baseline" }}
              {...containerProps}
            >
              <h3 className="page-heading mt-4">Search Results</h3>
              {indicatorEl}
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 && (
                  <tr>
                    <td colSpan={3}>No Results Found</td>
                  </tr>
                )}
                {results.map((tribe) => (
                  <tr
                    className="clickable-row"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleTribeSelect(tribe)}
                  >
                    <td>{tribe.name}</td>
                    <td>{tribe.latitude}</td>
                    <td>{tribe.longitude}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </ReadingWidth>
    </>
  );
};

export default SearchTribeView;
