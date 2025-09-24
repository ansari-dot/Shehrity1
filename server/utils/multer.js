import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Separate folders
const uploadPathImages = "uploads/services/";
const uploadPathPDFs = "uploads/certificates/";
const uploadPathCVs = "uploads/cvs/";
const uploadPathTeam = "uploads/team/";

// ✅ Create folders if not exist
[uploadPathImages, uploadPathPDFs, uploadPathCVs, uploadPathTeam].forEach((p) => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
});

// ✅ Storage engine (reuse for both)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check the field name to determine destination
    if (file.fieldname === "cv") {
      cb(null, uploadPathCVs);
    } else if (file.mimetype === "application/pdf") {
      cb(null, uploadPathPDFs);
    } else if (req.originalUrl.includes('/team/')) {
      // Team member images go to uploads/team/
      cb(null, uploadPathTeam);
    } else {
      // Default to services for other image uploads
      cb(null, uploadPathImages);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// ✅ Image filter
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed! (jpg, jpeg, png, webp)"));
  }
};

// ✅ PDF filter
const pdfFilter = (req, file, cb) => {
  const allowedTypes = /pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

// ✅ Multer configs
export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

export const uploadPDF = multer({
  storage,
  fileFilter: pdfFilter,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB max
});
