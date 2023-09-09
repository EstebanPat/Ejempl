//Importaciones Librerias
const mongoose = require("mongoose")
//Importaciones archivos 
require('dotenv').config();
const app = require('./app')


//mongodb+srv://software2_practica1:<password>@cluster1.n2tcl.mongodb.net/

//Conexión a la base de datos
const connection_string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/` 

mongoose
    .connect(connection_string)
    .then(()=>
        {
            
        })
    .catch((err)=>console.error(err));



app.listen(process.env.PORT, ()=>console.log(`IP SERVER:\nhttp://${process.env.IP_SERVER}:${process.env.PORT}/api/${process.env.API_VERSION}`))


//Apertura del puerto poer el cual corre el proyecto

