import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Canvas from "../components/Canvas";
import { toast } from "react-toastify";

const Create = () => {
  const [showSavePopup, setShowSavePop] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [fileName, setFileName] = useState("");
  const history = useHistory();

  const handleSetImageData = (imageData) => {
    setImageData(imageData);
  };

  const toggleSavePopup = () => {
    setShowSavePop(!showSavePopup);
  };

  const handleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("image", imageData);
    data.append("fileName", fileName);
    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
      },
    };
    axios
      .post("/api/drawings", data, config)
      .then((resp) => {
        toast.success("Drawing saved successfully");
        toggleSavePopup();
        history.push("/");
      })
      .catch((err) => {
        toast.error("Unable to save drawing");
        toggleSavePopup();
      });
  };

  return (
    <MDBRow className="p-5">
      <MDBCol md="10" className="text-center">
        <Canvas setImageData={handleSetImageData} />
      </MDBCol>
      <MDBCol md="2">
        <MDBBtn color="primary" onClick={toggleSavePopup}>
          Save
        </MDBBtn>
      </MDBCol>
      <MDBModal isOpen={showSavePopup} toggle={toggleSavePopup}>
        <MDBModalHeader toggle={toggleSavePopup}>
          Enter File Name
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="File Name"
            value={fileName}
            onChange={handleInputChange}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleSavePopup}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={handleSubmit}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBRow>
  );
};

export default Create;
