import express from "express";
import CertificateController from "../controllers/certificate.js";
import { auth } from "../middleware/auth.js";
import { uploadPDF } from "../utils/multer.js";
const router = express.Router();

// Admin uploads PDF
router.post(
    "/certificate/upload", auth,
    uploadPDF.single("file"),
    CertificateController.uploadCertificate
);

// User fetches their certificate
router.get("/certificate/my",  CertificateController.getMyCertificate);

// User to get all the give
router.get("/certificate/getAall", auth, CertificateController.getAllCertificates);
router.post("/certificate/apply", auth, CertificateController.applyCertificate);
export default router;