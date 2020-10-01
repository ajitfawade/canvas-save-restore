import Response from "../../utils/Response";
import { Logger } from "../../config/logger";
import DrawingService from "../../services/DrawingService";

export default class DrawingController {
  static async saveDrawing(req, res) {
    try {
      Logger.log("info", "Saving drawing");
      console.log("REQ:", req.body.fileName);
      const drawing = await DrawingService.saveDrawing({
        image: req.body.image,
        fileName: req.body.fileName,
      });

      Response.success(res, drawing);
    } catch (err) {
      Logger.log("error", "Error saving drawing", err);
      Response.fail({ message: "Unable to save drawing" }, err);
    }
  }

  static async getDrawing(req, res) {
    try {
      const drawing = await DrawingService.getDrawing(req.params.drawingId);

      Response.success(res, drawing);
    } catch (err) {
      Logger.log("error", "Error getting drawing", err);

      Response.fail(res, err);
    }
  }

  static async getAllDrawings(req, res) {
    try {
      Logger.log("info", "fetching all drawings");

      const drawings = await DrawingService.getAllDrawings();

      Response.success(res, drawings);
    } catch (err) {
      Response.fail(res, err);
    }
  }
}
