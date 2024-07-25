import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

import express  from "express";
import productsRouter from "./router";
import database from "./config/database";


//Conectar a base de datos
async function connectDB() {
    try {
        await database.authenticate();
        database.sync();
        console.log(colors.blue('Conexión exitosa a la DB'));
        
    } catch (error){
        console.log( colors.red('Error al conectar a la DB'));
    }
}



connectDB();

const server = express();

//PERMITIR CONEXIONES
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
            
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions));

//LEER DATOS
server.use(express.json());

server.use(morgan('dev'))
server.use('/api/products', productsRouter);

export default server;