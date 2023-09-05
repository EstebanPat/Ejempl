const Client = require("../models/client")
const images = require("../utils/image")
const fs = require('fs')

//Crear un Cliente

const createClient = async (req, res) => {

    const { name, email } = req.body
    const files = req.files

    if (name !== null && email !== null && files !== null) {

        const new_Client = await Client({
            name, email, active: true, photo: files.map(file=>images.getImageUrl(file.path.replaceAll('\\', '/' )))
        })

        const clientDB = await new_Client.save()
        res.status(201).json(clientDB)
        
    } else {
        throw new Error("Faltan campos requeridos");
    }
}

//Obtener todos los Clientes

const getAllClients = async (req, res) => {
    try {
        const response = await Client.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Consultar un Cliente

const getClientById = async (req, res) => {
    const { clientId } = req.params
    try {
        console.log(clientId)
        const response = await Client.findById(clientId)
        if(response !== null){
            res.status(200).json(response)
        }else {
            throw new Error("El Cliente no existe")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//Editar un Servicio

const editClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const client = await Client.findById(clientId)
        const clientData= req.body;
        const files = req.files;
        const photo = files.map(file=>images.getImageUrl(file.path.replaceAll('\\', '/' )));
        clientData.photo = photo;
        await Client.findByIdAndUpdate(clientId, clientData);

        try {
            client.photo.map(photo=> fs.unlinkSync(photo.replaceAll("http://localhost:3000", ".")))
            console.log('File removed')
        } catch(err) {
            console.error('Something wrong happened removing the file', err)
        }
        res.status(200).json({ message: "Cliente Actualizado"})
    } catch (error) {
        res.status(400).json(error)
    }
}

//Eliminar un servicio

const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.params
        const client = await Client.findById(clientId)
        try {
            client.photo.map(photo=> fs.unlinkSync(photo.replaceAll("http://localhost:3000", ".")))
            console.log('File removed')
        } catch(err) {
            console.error('Something wrong happened removing the file', err)
        }
        await Client.findByIdAndDelete(clientId)
        res.status(200).json({ message: "Cliente Eliminado"})
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    editClient,
    deleteClient
}