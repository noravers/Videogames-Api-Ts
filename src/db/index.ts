import { conn } from './config'
import { Videogame, Genres } from '../models/index';


//Init models
const videogameModel: any = Videogame(conn);
const genreModel: any = Genres(conn);


//Setup relation
genreModel.belongsToMany(videogameModel, { through: "VideogameGenres" })
videogameModel.belongsToMany(genreModel, { through: "VideogameGenres" })

//Sync the DB
export const syncDb = () => conn.sync({ force: true })

//export the synced models
export { videogameModel, genreModel }



