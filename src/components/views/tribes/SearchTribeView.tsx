import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ReadingWidth from "../../components/ReadingWidth";

import MapSearch from "../../components/MapSearch";

const SearchTribeView: React.FC = () => {
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
        <MapSearch />
        <Form></Form>
      </ReadingWidth>
    </>
  );
};

export default SearchTribeView;
