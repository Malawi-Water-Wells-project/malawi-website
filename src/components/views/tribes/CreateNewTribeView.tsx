import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import useCreateTribe from "../../../hooks/UseCreateTribe";
import ReadingWidth from "../../components/ReadingWidth";
import { GeoAltFill } from "react-bootstrap-icons";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import { AppBreadcrumbs } from "../../../core/Constants";

const CreateNewTribeView: React.FC = () => {
  const {
    name,
    latitude,
    longitude,
    setName,
    setLatitude,
    setLongitude,
    handleSubmit,
    handleCurrentLocation,
    nameErrors,
    locationErrors,
  } = useCreateTribe();
  useBreadcrumbs(AppBreadcrumbs.CREATE_NEW_TRIBE);

  return (
    <>
      <ReadingWidth className="fade-in">
        <h1 className="page-heading">Create a new village</h1>
        <p className="feature-text">
          Use this form to create a new village on the system.
          <br />
          Once a village has been added, village administrators can be set up.
        </p>

        <Form className="fade-in" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="tribe-name">Name</Form.Label>
            <p className="hint" id="tribe-name-hint">
              This is the name shown to the village on the App.
            </p>
            {nameErrors.length > 0 && (
              <p className="error fade-in">
                {nameErrors.map((error, index) => (
                  <>
                    {error}
                    {index < nameErrors.length - 1 && <br />}
                  </>
                ))}
              </p>
            )}
            <Form.Control
              id="tribe-name"
              value={name}
              aria-describedby="tribe-name-hint"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <fieldset className="mb-4">
            <legend className="form-label">Location</legend>
            <p className="hint">
              Please enter the latitude and longitude location (in degrees).
              <br />
              For example: -13.2543&deg;N 34.3015&deg;E
            </p>
            {"geolocation" in navigator && (
              <a
                className="lat-long-input__current"
                onClick={handleCurrentLocation}
              >
                <GeoAltFill />
                Use my current location
              </a>
            )}
            {locationErrors.length > 0 && (
              <p className="error fade-in">
                {locationErrors.map((error, index) => (
                  <>
                    {error}
                    {index < nameErrors.length - 1 && <br />}
                  </>
                ))}
              </p>
            )}
            <div className="lat-long-input">
              <div className="lat-long-input__lat">
                <label id="tribe-latitude-label" htmlFor="tribe-latitude">
                  Latitude
                </label>
                <InputGroup>
                  <FormControl
                    type="number"
                    value={latitude}
                    id="tribe-latitude"
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>&deg;N</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
              <div className="lat-long-input__long">
                <label id="tribe-longitude-label" htmlFor="tribe-longitude">
                  Longitude
                </label>
                <InputGroup>
                  <FormControl
                    type="number"
                    value={longitude}
                    id="tribe-longitude"
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>&deg;E</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div>
          </fieldset>
          <Button type="submit" size="lg" variant="primary" className="mr-3">
            Create Tribe
          </Button>
          <Button size="lg" variant="secondary">
            Cancel
          </Button>
        </Form>
      </ReadingWidth>
    </>
  );
};

export default CreateNewTribeView;
