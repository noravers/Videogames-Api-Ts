import { Router } from "express";
import videogamesRouter from './videogames'
import videogameRouter from './videogame'
import genresRouter from './genres'


const router = Router();

router.use('/videogames', videogamesRouter);
router.use('/videogame/', videogameRouter)
router.use('/genres', genresRouter)


export default router;