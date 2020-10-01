import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol } from "mdbreact";
import Drawing from "../components/SavedDrawing";

const Home = () => {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/drawings")
      .then(({ data }) => {
        setLoading(false);
        setDrawings(data.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Unable to fetch all drawings");
      });
  }, []);

  return (
    <MDBRow>
      {loading && (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {drawings.length ? (
        drawings.map((drawing) => (
          <MDBCol key={drawing._id} md="4" sm="2" xs="1">
            <Drawing drawing={drawing} />
          </MDBCol>
        ))
      ) : (
        <p>No drawings available</p>
      )}
    </MDBRow>
  );
};

export default Home;
