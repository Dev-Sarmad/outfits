

import multer from "multer";
import path from "node:path";
import fs from "fs";
import { ApiError } from "../errors/ApiError.ts";

const filePath = path.resolve("public/data/uploads");

fs.mkdirSync(filePath, { recursive: true });

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, filePath);
  },
  filename: (request, file, cb) => {
    const uniqueFileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueFileName + path.extname(file.originalname));
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new ApiError(400, "only image files are allowed", "Invalid file type"),
      );
    }
  },
});

export default uploads;