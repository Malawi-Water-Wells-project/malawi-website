import React, { useState } from "react";
import { AppBreadcrumbs } from "../../../core/Constants";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import ReadingWidth from "../../components/ReadingWidth";
import { useDropzone } from "react-dropzone";
import APIClient from "../../../core/APIClient";

const BulkWellUpload: React.FC = () => {
  const [working, setWorking] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  useBreadcrumbs(AppBreadcrumbs.BULK_WELL_UPLOAD);

  const onDrop = (files: File[]) => {
    if (files.length > 1) {
      setError("You cannot upload multiple files at the same time.");
      return;
    }

    if (files[0].type !== "text/csv") {
      setError("File is not a CSV.");
      return;
    }
    setError("");
    setWorking(true);
    setFile(files[0]);

    APIClient.well.uploadBulkWells(files[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // disabled: working,
  });

  return (
    <ReadingWidth>
      <h1 className="page-heading">Well Bulk Upload</h1>
      <p className="feature-text">
        Use this form to upload multiple new wells to the system.
        <br />
        The input file must be in CSV format, with the following rows:{" "}
        <b>WP_ID</b>, <b>District</b>, <b>SubDistrict</b>, <b>Village</b>,{" "}
        <b>Easting</b>, and <b>Northing</b>.
      </p>
      {error && (
        <p className="error feature-text feature-text--error fade-in">
          {error}
        </p>
      )}
      <div
        className={
          isDragActive
            ? "drag-drop-upload drag-drop-upload--active"
            : "drag-drop-upload"
        }
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="drag-drop-upload__text">
          Drag and drop a file here to upload, or click here to select a file.
        </p>
      </div>
    </ReadingWidth>
  );
};

export default BulkWellUpload;
