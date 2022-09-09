import { Router } from "express";
import { genres } from "../controllers/genresController";

const router = Router()

router.get('/', genres)

export default router;