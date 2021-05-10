import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useParams } from "react-router";
import APIClient from "../../../core/APIClient";
import { User } from "../../../types/APITypes";

const TribeAdminDetails: React.FC = () => {
  const { tribeID } = useParams() as { tribeID: string };
  const [admins, setAdmins] = useState<null | User[]>();

  useEffect(() => {
    APIClient.tribe.getTribeAdminsByID(tribeID).then((result) => {
      if (result === null) throw Error();
      setAdmins(result);
    });
  }, [tribeID]);

  return (
    <details className="details">
      <summary className="details__summary">Tribe Admins</summary>
      <div className="details__content">
        {admins ? (
          <>
            <p className="mt-3">
              There {admins.length === 1 ? "is" : "are"} {admins.length} tribe
              {admins.length === 1 ? " admin" : " admins"} associated with this
              tribe.
            </p>
            <Table className="mt-3">
              <thead>
                <th>Name</th>
                <th>Username</th>
                <th>User Since</th>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr>
                    <td>{admin.name}</td>
                    <td>{admin.username}</td>
                    <td>{admin.created_on}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}>
                    <ButtonGroup style={{ width: "100%" }}>
                      <Button>Add New Tribe Admin</Button>
                      <Button>Add New Tribe Admin</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        ) : null}
      </div>
    </details>
  );
};

export default TribeAdminDetails;
