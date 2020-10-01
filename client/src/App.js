import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { MDBContainer } from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import Drawing from "./pages/Drawing";
import Create from "./pages/Create";
import "./App.css";

function App() {
  return (
    <MDBContainer>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/:drawingId" component={Drawing} />
        </Switch>
      </Router>
      <ToastContainer position="top-right" newestOnTop />
    </MDBContainer>
  );
}

export default App;
