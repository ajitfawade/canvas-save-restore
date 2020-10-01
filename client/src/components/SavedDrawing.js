import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from "mdbreact";

const SavedDrawing = ({ drawing }) => {
  const { imagePath, fileName } = drawing;
  return (
    <MDBCard>
      <MDBCardImage className="img-fluid" src={imagePath} />
      <MDBCardBody>
        <MDBCardTitle>{fileName}</MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SavedDrawing;
