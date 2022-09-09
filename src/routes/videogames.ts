import { Router } from 'express'
import { videogames } from "../controllers/videogamesController"

const router = Router();

router.get('/', videogames)


export default router;