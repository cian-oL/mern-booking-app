import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { body } from "express-validator";

import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
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
    body("hotelName").notEmpty().withMessage("Name is required"),
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
    body("hotelType").notEmpty().withMessage("Hotel type is required"),
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
  upload.array("imageFiles", 6), // expect a form prop called imageFiles w array of up to 6
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload each image to cloudinary as base64-encoded string
      const uploadPromises = imageFiles?.map(async (imageFile) => {
        const b64 = Buffer.from(imageFile.buffer).toString("base64");
        const dataURI = `data:${imageFile.mimetype};base64,${b64}`;
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

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(201).json(hotels);
  } catch (err) {
    console.error("Error findinghotels", err);
    res.status(500).json({ message: "Error finding hotels" });
  }
});

export default router;
