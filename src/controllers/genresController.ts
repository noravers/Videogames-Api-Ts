import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Request, Response } from "express";
import { genreModel } from "../db";
import type { IGenre, IGenres } from "../types";

const API = "https://api.rawg.io/api/genres";
const apikey = '?key=b209ede589ff486aa1fbed5fb5e79313'

const getGenresFromApi = async (): Promise<IGenres> => {

    const config: AxiosRequestConfig = {
        url: `${API}${apikey}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin': 'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        },
        params: { apikey: apikey }

    };
    const { data }: { data: IGenres } = await axios(config).catch(err => err)
    return data;
};

const getGenresFromDb = async () => {
    const data = await genreModel.findAll({
        attributes: ["id", "name"]
    }
    );
    return data;
};

export const genres = async (req: Request, res: Response) => {
    try {
        const genresFromDb = await getGenresFromDb();
        if (genresFromDb.length) {
            return res.json(genresFromDb);
        }

        const genresFromApi = await getGenresFromApi();
        // console.log(genresFromApi);
        const genresNames = genresFromApi.results.map((genre: IGenre) => ({
            name: genre.name,
        }));
        const genres = await genreModel.bulkCreate(genresNames);
        // res.json(genres);
    } catch (e) {
        res.status(400).json(e);
    }
};
