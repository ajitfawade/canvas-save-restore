import express from "express";
import { fileUpload } from "../../middlewares/multer";
import DrawingController from "./controller";

function getDrawingRoutes() {
  const router = express.Router();

  router.post("", fileUpload, DrawingController.saveDrawing);

  router.get("/:drawingId", DrawingController.getDrawing);

  router.get("", DrawingController.getAllDrawings);

  return router;
}

export { getDrawingRoutes };
