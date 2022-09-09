import server from "./app";
import 'dotenv/config';
import { syncDb } from './db';
import axios from "axios";
const { PORT } = process.env;



syncDb()
    .then(() => console.log('Database synced'))
    .catch((e) => console.log('Error on databse syncing' + e))


server.listen(PORT, async () => {


    console.log(`Listening at ${PORT || 5000}`);
}
);