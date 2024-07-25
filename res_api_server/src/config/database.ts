import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import path from 'path'

//MANDAMOS A LLAMAR LAS VARIABLES DE ENTORNO
dotenv.config();

const database = new Sequelize(process.env.DATABASE_URL!, {
    models : [path.join(__dirname + "/../models/**/*")]
});

export default database;