
//Importacion de librerias
const bodyParser = require("body-parser")
const express = require('express')
const addressRoutes = require("./routes/address")
//Importacion de archivos
const { API_VERSION, IP_SERVER } = require('./config')
PORT = 3000

const app = express()

//Visualizacion del contenido del endpoint o envio del contenido
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configuracion cabeceras HTTP
app.use(`/${this.PORT}/${API_VERSION}/addresses`, addressRoutes)

/* 
    get = v1/addresses
    post = v1/addresses/new-address
*/
module.exports = {
    PORT,
    app
}