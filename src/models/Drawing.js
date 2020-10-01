const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DrawingSchema = new Schema(
  {
    fileName: {
      type: String,
      unique: true,
      required: [true, "File name is required"],
    },
    imagePath: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("drawings", DrawingSchema);
