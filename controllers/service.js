const Service = require("../models/service")


//Crear un servicio

const createService = async (req, res) => {

    const { name, description, category } = req.body
    const files = req.files
    console.log(files)

    if(name !== null && description !== null && category !== null && files !== null ){
        const new_service = await Service({
            name, description, category, active: true, photos: files.map(file=>file.path)
        })
        const serviceDB = await new_service.save()
        res.status(201).json(serviceDB)
    }else {
        throw new Error("Faltan campos requeridos")
    }
}

//Obtener todos los servicios

const getAllServices = async (req, res) => {
    try {
        const response = await Service.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Consultar un Servicio

const getServiceById = async (req, res) => {
    const { serviceId } = req.params
    try {
        console.log(serviceId)
        const response = await Service.findById(serviceId)
        if(response !== null){
            res.status(200).json(response)
        }else {
            throw new Error("El Servicio no existe")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

//Editar un Servicio

const editService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const serviceData= req.body
        console.log(serviceData)
        await Service.findByIdAndUpdate(serviceId, serviceData);
        res.status(200).json({ message: "Servicio Actualizado"})
    } catch (error) {
        res.status(400).json(error)
    }
}

//Eliminar un servicio

const deleteService = async (req, res) => {
    try {
        const { serviceId } = req.params
        await Service.findByIdAndDelete(serviceId)
        res.status(200).json({ message: "Servicio Eliminado"})
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createService,
    getAllServices,
    deleteService,
    getServiceById,
    editService
}