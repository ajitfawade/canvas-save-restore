import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol } from "mdbreact";
import Drawing from "../components/SavedDrawing";

const Home = () => {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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

  const openDrawing = (drawing) => {
    history.push(`/${drawing._id}`);
  };

  return (
    <>
      <MDBRow className="m-5">
        <Link className="btn-default btn" to={`/create`}>
          Create
        </Link>
      </MDBRow>
      <MDBRow className="m-5">
        {loading && (
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {drawings.length ? (
          drawings.map((drawing) => (
            <MDBCol key={drawing._id} md="4" sm="2" xs="1">
              <Drawing
                drawing={drawing}
                openDrawing={() => openDrawing(drawing)}
              />
            </MDBCol>
          ))
        ) : (
          <p>No drawings available</p>
        )}
      </MDBRow>
    </>
  );
};

export default Home;
