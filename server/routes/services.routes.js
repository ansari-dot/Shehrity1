import express from "express";
import ServicesController from "../controllers/services.js";
import { upload } from "../utils/multer.js";
import { auth } from "../middleware/auth.js"
const router = express.Router();

// Public routes
router.get("/service/digital/first-five", ServicesController.getFiveDigitalServices);
router.get("/service/get", ServicesController.getServices);

// Protected routes (require authentication)
router.post("/service/add", auth, upload.single("image"), ServicesController.createService);
router.get("/service/get/:id", auth, ServicesController.getService);
router.put("/service/update/:id", auth, upload.single("image"), ServicesController.updateService);
router.delete("/service/:id", auth, ServicesController.deleteService);

// Additional service type routes
router.get("/service/digital", ServicesController.getDigitalServices);
router.get("/service/physical", ServicesController.getPhysicalServices);
router.get("/service/physical/first-five", ServicesController.getFivePhysicalServices);

// Featured services routes
router.put("/service/toggle-featured/:id", auth, ServicesController.toggleFeatured);
router.get("/service/featured", ServicesController.getFeaturedServices);

export default router;