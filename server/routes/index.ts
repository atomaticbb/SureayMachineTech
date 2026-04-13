import { Router } from "express";
import productsRouter from "./products.js";
import contactRouter from "./contact.js";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import regionRouter from "./region.js";

const router = Router();

router.use("/", productsRouter);
router.use("/", contactRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/", regionRouter);

export default router;
