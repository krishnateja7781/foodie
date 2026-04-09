import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

import fs from 'fs';

// Ensure uploads folder exists so multer doesn't crash on ENOENT
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage })

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;