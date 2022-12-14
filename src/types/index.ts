export interface IPlatform {
    platform: {
        id: number;
        name: string;
        [key: string]: any;
    };
    [key: string]: any
}

export interface IGenre {
    id: number;
    name: string;
    [key: string]: any;
}

export interface IGenres {
    count: number;
    next: string;
    previous: string;
    results: IGenre[]
}

export interface IVideogame {
    id: number;
    name: string;
    description?: string;
    released?: string;
    rating?: number;
    image: string;
    platforms: IPlatform[];
    genres: IGenre[];
    createdInDb?: boolean;
    [key: string]: any;

}

export interface IVideogames {
    count: number;
    next: string;
    previous: string;
    results: IVideogame[]
}

export interface errors {
    name: string;
    msg: string;
}