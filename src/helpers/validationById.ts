import { IVideogame, errors } from "../types";



export const validationById = ({ name, description, platforms, genres }: Partial<IVideogame>) => {

    // console.log({ name, description, platforms, genres });

    const errors: errors[] = [];


    if (typeof name !== 'string' || name.trim().length < 5 || name.trim().length > 100) {
        errors.push({
            name: 'name',
            msg: 'Name should be longer than 5 characters and shorter than 100 characters',
        })
    }

    if (typeof description !== 'string' || description.trim().length < 15 || description.trim().length > 1500) {
        errors.push({
            name: 'description',
            msg: 'Description should be an string longer than 15 and shorter than 1000 characters',
        })
    }


    if (!genres || !Array.isArray(genres) || genres.some((e: any) => !Number.isInteger(Number(e)))) {
        errors.push({
            name: 'genres',
            msg: `Genres should be an array of id's`,
        })
    }
    if (!platforms || !Array.isArray(platforms) || !platforms.every((e: any) => typeof e === 'string')) {
        errors.push({
            name: 'platforms',
            msg: 'Platforms should be an array of strings',
        })
    }

    return errors;

}