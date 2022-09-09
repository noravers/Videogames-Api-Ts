import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Request, Response } from "express";
import { genreModel, videogameModel } from "../db";
import { IGenre, IPlatform, IVideogame, IVideogames } from '../types/index'
import { validationById } from "../helpers/validationById";

const API = "https://api.rawg.io/api/games";
const apikey = '?key=b209ede589ff486aa1fbed5fb5e79313'


const getVideogameFromApi = async (id: string) => {

    const config: AxiosRequestConfig = {
        url: `${API}/${id}${apikey}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin': 'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        },
        params: { apikey: apikey }
    }

    let { data }: { data: IVideogame } = await axios(config).catch(err => err)

    return {
        id: data.id,
        name: data.name,
        description: data.description,
        genres: data.genres.map((genre: IGenre) => genre.name),
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map((platform: IPlatform) => platform.platform.name),
        image: data.background_image
    }
}


export const getVideogameById = async (req: Request, res: Response) => {

    const { id }: any = req.params

    if (!req) {
        return res.status(400).json({ msg: 'The id is required' })
    }

    if (isNaN(id)) {
        try {
            let videogame = await videogameModel.findByPk(id, {
                include: [
                    {
                        model: genreModel,
                        as: 'genres',
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            }).then((e: any) => e.toJSON())

            videogame.genres = videogame.genres.map((e: IGenre) => e.name)

            res.status(200).json(videogame)

        } catch (e) {
            res.status(400).json(e)
        }
    } else {
        try {
            let result = await getVideogameFromApi(id)
            res.status(200).json(result)

        } catch (err) {
            res.status(400).json(err)
        }
    }
}



export const createVideogame = async (req: Request, res: Response) => {
    console.log('entrando');

    let { name, description, released, rating, platforms, genres } = req.body;

    console.log({ name, description, released, rating, platforms, genres });

    console.log(typeof name);
    console.log(typeof description);
    console.log(typeof released);
    console.log(typeof rating);
    console.log(typeof platforms);
    console.log(typeof genres);


    let error = validationById({ name, description, platforms, genres });
    if (error.length) {
        return res.status(400).json(error)

    }

    const game: any = {
        name,
        description,
        rating: rating === '' ? null : rating,
        released: released === '' ? null : released,
        image: 'https://media.giphy.com/media/PGOfNH0KhpvZ1ssAw1/giphy.gif',
        platforms,
    }

    const [videogame, created] = await videogameModel.findOrCreate({
        where: {
            ...game
        }
    })

    try {

        genres && created && await videogame.addGenres(genres);
        res.status(200).json('The videogame was created')

    } catch (e) {

        res.status(400).json('Error at creating videogame' + e)

    }

}