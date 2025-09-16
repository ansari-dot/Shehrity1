import express from "express";
import ServicesController from "../controllers/services.js";
import { upload } from "../utils/multer.js";
import { auth } from "../middleware/auth.js"
const router = express.Router();

router.post("/service/add", auth, upload.single("image"), ServicesController.createService);
router.get("/service/get", ServicesController.getServices);
router.get("/service/get/:id", auth, ServicesController.getService);
router.put("/service/update/:id", auth, upload.single("image"), ServicesController.updateService);
router.delete("/service/:id", auth, ServicesController.deleteService);

export default router;