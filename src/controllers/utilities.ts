import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Op } from "sequelize";
import { genreModel, videogameModel } from "../db";
import { IVideogame, IGenre, IVideogames } from "../types";



const API = "https://api.rawg.io/api/games";
const apikey = '?key=b209ede589ff486aa1fbed5fb5e79313'

const getInfoApi = async () => {

    const config: AxiosRequestConfig = {
        url: `${API}${apikey}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin': 'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        }
    }

    const config2: AxiosRequestConfig = {
        url: `${API}${apikey}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin': 'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        }
    }

    type Data = { data: IVideogames };

    config.params = { apikey: apikey, page_size: 30 }
    config2.params = { apikey: apikey, page_size: 40, page: 2 }

    return Promise.all([
        axios(config).catch(err => err),
        axios(config2).catch(err => err),
    ]).then(([page1, page2]: Data[]) => {

        // console.log([page1, page2]);


        const data = [...page1.data.results, ...page2.data.results];


        return data.map((videogame: IVideogame) => ({
            id: videogame.id,
            name: videogame.name,
            image: videogame.background_image,
            rating: videogame.rating,
            genres: videogame.genres.map((genre: IGenre) => genre.name),
        }));

    });


}


const getInfoDb = async () => {

    const games = await videogameModel.findAll({
        attributes: ['id', 'name', 'image', 'createdInDb'],
        include: [
            {
                mapToModel: true,
                model: genreModel,
                as: 'genres',
                attributes: ['name'],
                through: { attributes: [] },

            }
        ],
    }).then((e: any) => e.map((e: any) => e.toJSON()))

    games.forEach((game: any) => {
        game.genres = game.genres.map((e: IGenre) => e.name)
    })

    return games;

}



export const getVideogame = async () => {


    return Promise.all([getInfoDb(), getInfoApi()])
        .then(([dataFromDb, dataFromApi]) => {
            return ([...dataFromDb, ...dataFromApi])
        })

}