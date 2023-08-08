//Importaciones Librerias
const express = require('express')
const mongoose = require("mongoose")
const app = express()
//Importaciones archivos 
const {DB_HOST, DB_USER, DB_PASSWORD , IP_SERVER, API_VERSION} = require('./config')
const {PORT} = require('./app')


//mongodb+srv://software2_practica1:<password>@cluster1.n2tcl.mongodb.net/

//Conexión a la base de datos
let connection_string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/` 

mongoose
    .connect(connection_string)
    .then(()=>
        {
            console.log('Conexion exitosa')
            app.listen(PORT, ()=>console.log(`IP SERVER:\nhttp://${IP_SERVER}:${PORT}/${API_VERSION}`))
        })
    .catch((err)=>console.error(err))


//Apertura del puerto poer el cual corre el proyecto
