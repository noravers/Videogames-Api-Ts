import { Router } from "express";
import { getVideogameById, createVideogame } from "../controllers/videogameController";

const router = Router()

router.get('/:id', getVideogameById)
router.post('/', createVideogame)

export default router;