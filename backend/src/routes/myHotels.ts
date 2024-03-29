import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { body } from "express-validator";

import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";

const router = express.Router();

// store any (image) files in memory, do not save directly to db
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Prie per night is required and must be a number"),
    body("rating")
      .notEmpty()
      .isNumeric()
      .withMessage("Star rating is required"),
    body("hotelTyoe").notEmpty().withMessage("Hotel type is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult count is required"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child count is required"),
  ],
  upload.array("imageFiles", 6), // expect a form prop called iamgeFiles w array of up to 6
  async (req: Request, res: Response) => {
    try {
      const newHotel: HotelType = req.body;
      const imageFiles = req.files as Express.Multer.File[];

      // upload each image to cloudinary as base64-encoded string
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);

      //add url strings to hotel object & save to db
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId; // coming from auth cookie

      const hotel = new Hotel(newHotel);
      await hotel.save();

      return res.status(201).send(hotel);
    } catch (err) {
      console.error("Error creating hotel: ", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
