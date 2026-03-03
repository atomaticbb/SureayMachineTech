import { Router } from "express";
import multer from "multer";
import { submitContactForm } from "../controllers/contactController.js";

// ── Allowed CAD/document extensions ─────────────────────────────────────────
const ALLOWED_EXT = /\.(pdf|dxf|dwg|step|stp)$/i;

const upload = multer({
  storage: multer.memoryStorage(),          // never touches disk
  limits: { fileSize: 15 * 1024 * 1024 },  // 15 MB hard cap
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_EXT.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: .pdf .dxf .dwg .step .stp"));
    }
  },
});

const router = Router();

// upload.single('attachment') populates req.file; text fields land in req.body
router.post("/contact", upload.single("attachment"), submitContactForm);

export default router;
