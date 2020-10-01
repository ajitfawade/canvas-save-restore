import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

const SavedDrawing = ({ drawing, openDrawing }) => {
  const { imagePath, fileName } = drawing;
  const downloadImage = (e) => {
    e.stopPropagation();
    let a = document.createElement("a");
    a.href = imagePath;
    a.download = `${fileName}.png`;
    a.click();
  };

  return (
    <MDBCard onClick={openDrawing}>
      <MDBCardImage
        style={{ backgroundColor: "black" }}
        className="img-fluid"
        src={imagePath}
      />
      <MDBCardBody>
        <MDBCardTitle>{fileName}</MDBCardTitle>
      </MDBCardBody>
      <MDBCardFooter className="text-center">
        <MDBBtn size="small" onClick={downloadImage}>
          <MDBIcon icon="download" />
        </MDBBtn>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default SavedDrawing;
