import express from "express";
import { getDrawingRoutes } from "./drawing";

function getRoutes() {
  const router = express.Router();

  router.use("/test", (req, res) => {
    res.status(200).send("Okay");
  });

  router.use("/drawings", getDrawingRoutes());

  return router;
}
export { getRoutes };
