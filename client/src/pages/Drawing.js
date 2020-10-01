import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { toast } from "react-toastify";

import axios from "axios";

import Canvas from "../components/Canvas";

const Drawing = () => {
  const [imageURL, setImageURL] = useState("");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { drawingId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/drawings/${drawingId}`)
      .then((drawing) => {
        setLoading(false);
        setImageURL(drawing.imagePath);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Unable to get the drawing");
      });
  }, []);

  const handleSetImageData = (imageData) => {
    setImageData(imageData);
  };

  const updateDrawing = () => {};

  return (
    <MDBRow className="p-5">
      {loading && (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <MDBCol md="10" className="text-center">
        <Canvas imageURL={imageURL} setImageData={handleSetImageData} />
      </MDBCol>
      <MDBCol md="2">
        <MDBBtn color="secondary" onClick={updateDrawing}>
          Update
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
};

export default Drawing;
