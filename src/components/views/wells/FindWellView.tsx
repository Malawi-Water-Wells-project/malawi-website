import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import APIClient from "../../../core/APIClient";
import useWells from "../../../hooks/UseWells";
import ReadingWidth from "../../components/ReadingWidth";

export const FindWellView: React.FC = () => {
  const { isLoading, wells } = useWells();
  console.log(JSON.stringify(wells, null, 2));
  return (
    <ReadingWidth>
      <h1 className="page-heading">Find Wells</h1>
      {isLoading ? (
        <p className="lead fade-in">Loading...</p>
      ) : (
        <>
          <Table className="fade-in">
            <thead>
              <th>Well ID</th>
              <th>Country</th>
              <th>District</th>
              <th>Subdistrict</th>
              <th>Village</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </thead>
            <tbody>
              {wells.map((well) => (
                <tr>
                  <td>{well.well_id}</td>
                  <td>{well.country}</td>
                  <td>{well.district}</td>
                  <td>{well.sub_district}</td>
                  <td>{well.village}</td>
                  <td>{well.latitude}</td>
                  <td>{well.longitude}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </ReadingWidth>
  );
};

export default FindWellView;
