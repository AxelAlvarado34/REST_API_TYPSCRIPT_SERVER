import colors from 'colors'

import server from "./server";
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.PORT;

server.listen( port, ()=> {
    console.log(colors.cyan(`Servidor iniciado en el puerto ${port}`));
})