import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    axios
      .get("/api/test")
      .then((resp) => {
        toast.success("APIs are working");
      })
      .catch((err) => {
        toast.error("APIs are not working");
      });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ToastContainer position="top-right" newestOnTop />
    </div>
  );
}

export default App;
