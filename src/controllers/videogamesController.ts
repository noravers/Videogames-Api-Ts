import { getVideogame } from './utilities'
import type { Response, Request } from "express";

export const videogames = async (req: Request, res: Response) => {

    const name: any = req.query.name;

    let allInfo = await getVideogame();

    try {
        if (!name) {
            res.status(200).json({ Data: allInfo })
        }
        if (name) {
            let filterbyName = allInfo.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            res.status(200).json({ Data: filterbyName })
        }
    } catch (e) {
        res.status(400).json('Videogames not found: ' + e)
    }
};







































// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { Op } from "sequelize";
// import { genreModel, videogameModel } from "../db";
// import { IVideogame, IGenre, IVideogames } from "../types";
// import { Response, Request } from "express";






// const API = "https://api.rawg.io/api/games";
// const apikey = '?key=b209ede589ff486aa1fbed5fb5e79313'

// const getInfoApi = async (name: any) => {

//     const config: AxiosRequestConfig = {
//         url: `${API}${apikey}`,
//         method: 'GET',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'origin': 'x-requested-with',
//             'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
//             'Content-Type': 'application/json',
//         }
//     }

//     const config2: AxiosRequestConfig = {
//         url: `${API}${apikey}`,
//         method: 'GET',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'origin': 'x-requested-with',
//             'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
//             'Content-Type': 'application/json',
//         }
//     }

//     type Data = { data: IVideogames };
//     if (name) {
//         config.params = { apikey: apikey, page_size: 15, search: name }
//         return axios(config)
//             .then((response: Data) => {
//                 return response.data.results.map((game: IVideogame) => ({
//                     id: game.id,
//                     name: game.name,
//                     image: game.background_image,
//                     rating: game.rating,
//                     genres: game.genres.map((genre: IGenre) => genre.name),
//                 }));
//             });

//     }

//     else {
//         config.params = { apikey: apikey, page_size: 30 }
//         config2.params = { apikey: apikey, page_size: 40, page: 2 }

//         return Promise.all([
//             axios(config).catch(err => err),
//             axios(config2).catch(err => err),
//         ]).then(([page1, page2]: Data[]) => {

//             const data = [...page1.data.results, ...page2.data.results];

//             // console.log(data);

//             return data.map((videogame: IVideogame) => ({
//                 id: videogame.id,
//                 name: videogame.name,
//                 image: videogame.background_image,
//                 rating: videogame.rating,
//                 genres: videogame.genres.map((genre: IGenre) => genre.name)
//             }));

//         });
//     }

// }


// const getInfoDb = async () => {

//     const games = await videogameModel.findAll({
//         attributes: ['id', 'name', 'image', 'createdInDb'],
//         include: [
//             {
//                 mapToModel: true,
//                 model: genreModel,
//                 as: 'genres',
//                 attributes: ['name'],
//                 through: { attributes: [] }
//             }
//         ]
//     })

//     return games;

// }



// export const getVideogame = async (req: Request, res: Response) => {

//     const { name } = req.query

//     Promise.all([getInfoDb(), getInfoApi(name)])
//         .then(([dataFromDb, dataFromApi]) => {
//             console.log(dataFromApi.length);
//             res.json([...dataFromDb, ...dataFromApi])
//         })
//         .catch(e => {
//             res.status(404).json(e)
//         })
// }