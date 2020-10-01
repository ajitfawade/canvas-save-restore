import AWS from "aws-sdk";
import imageDataURI from "image-data-uri";
import httpStatusCodes from "http-status-codes";
import { drawingBucket } from "../config/aws";
import { Logger } from "../config/logger";

import Response from "../utils/Response";
import DrawingModel from "../models/Drawing";

const s3 = new AWS.S3();

export default class DrawingService {
  static async saveDrawing(params) {
    try {
      // Save image to S3 and then save the path to DB.
      const { fileName, image } = params;

      const imageData = imageDataURI.decode(image);

      const s3params = {
        Bucket: drawingBucket,
        Key: `${fileName}.png`,
        Body: imageData.dataBuffer,
      };
      const meta = await s3.upload(s3params).promise();

      Logger.log("info", `File uploaded successfully`, meta);

      const createdDrawing = new DrawingModel({
        fileName,
        imagePath: meta.Location,
      });

      const saved = await createdDrawing.save();

      return { data: saved };
    } catch (err) {
      console.error(err);
      Logger.log("error", "Unable to save drawing", err);

      throw Response.createError({
        message: "Unable to save drawing",
        code: httpStatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getDrawing(params) {
    try {
      let drawing = await DrawingModel.findById(params.drawingId).exec();
      s3.getSignedUrl(
        "getObject",
        {
          Bucket: drawingBucket,
          Key: `${drawing.fileName}.png`,
          Expires: expirySeconds || 60 * 5, // in seconds
        },
        (err, data) => {
          if (!err) {
            drawing = drawing.toObject();
            drawing.imagePath = data;
            return { data: drawing };
          } else {
            throw React.createError({
              message: "Unable to get the drawing",
              code: httpStatusCodes.INTERNAL_SERVER_ERROR,
            });
          }
        }
      );
    } catch (err) {
      Logger.log("error", "Unable to get drawing", err);
      throw Response.createError({
        message: "Unable to get drawing",
        code: httpStatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getAllDrawings() {
    try {
      const drawings = await DrawingModel.find().exec();
      const allDrawings = await Promise.all(
        drawings.map(async (drawing) => {
          return new Promise((resolve, reject) => {
            s3.getSignedUrl(
              "getObject",
              {
                Bucket: drawingBucket,
                Key: `${drawing.fileName}.png`,
                Expires: 60 * 5, // in seconds
              },
              (err, data) => {
                if (err) {
                  Logger.log("error", "ERROR LOADING IMAGE FROM S3", err);

                  reject(
                    Response.createError({
                      message: "Unable to load image path",
                      code: httpStatusCodes.BAD_GATEWAY,
                    })
                  );
                }
                const drawingObj = drawing.toObject();
                resolve({ ...drawingObj, imagePath: data });
              }
            );
          });
        })
      );

      return { data: allDrawings };
    } catch (err) {
      Logger.log("error", "Error getting all drawings", err);

      throw Response.createError({
        message: "Error getting all drawings",
        code: httpStatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
