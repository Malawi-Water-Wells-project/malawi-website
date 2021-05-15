import React, { useState } from "react";
import { AppBreadcrumbs } from "../../../core/Constants";
import useBreadcrumbs from "../../../hooks/UseBreadcrumbs";
import ReadingWidth from "../../components/ReadingWidth";
import { useDropzone } from "react-dropzone";
import APIClient from "../../../core/APIClient";

const BulkWellHygieneUpload: React.FC = () => {
  const [working, setWorking] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  useBreadcrumbs(AppBreadcrumbs.BULK_WELL_UPLOAD);

  const onDrop = (files: File[]) => {
    if (files.length > 1) {
      setError("You cannot upload multiple files at the same time.");
      return;
    }
    console.log(files)

    if (!["text/csv", "application/vnd.ms-excel"].includes(files[0].type)) {
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
      <h1 className="page-heading">Well Hygiene Bulk Upload</h1>
      <p className="feature-text">
        Use this form to upload new well hygiene levels to the system.
        <br />
        The input file must be in CSV format, with the following rows:{" "}
        <b>id</b>, <b>village</b>, <b>tc_dry</b>, <b>tc_dry</b>,{" "}
        <b>tc_wet</b>, <b>turbidity_dry</b>, <b>turbidity_wet</b>,{" "}
        <b>tds_dry</b>, <b>tds_wet</b>, <b>electrical_conductivity_wet</b>,{" "}
        <b>electrical_conductivity_dry</b>, <b>ph_dry</b>, <b>ph_wet</b>,{" "}
        <b>temperature_dry</b>. <b>temperature_wet</b>, <b>fluoride_dry</b>,{" "}
        <b>fluoride_wet</b>, <b>sulphate_dry</b>, <b>sulphate_wet</b>, {" "}
        <b>hardness_dry</b>, <b>hardness_wet</b>, <b>nitrate_dry</b>, {" "}
        <b>nitrate_wet</b>, <b>ammonia_dry</b>, <b>ammonia_wet</b>, {" "}
        <b>arsonic_dry</b>, <b>arsonic_wet</b>, <b>nitrate_no2_dry</b>, {" "}
        <b>nitrate_no2_wet</b>, and <b>timestamp</b>.
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

export default BulkWellHygieneUpload;