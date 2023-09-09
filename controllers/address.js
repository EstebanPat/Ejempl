const Address = require('../models/address')


const createAddress =async (req, res)=>{
    const address = new Address({
        country: req.body.country,
        department: req.body.department,
        state: req.body.state,
        nomclature: req.body.nomclature,
    })
    const saveAddress = await address.save()
    res.json(saveAddress)
}

//GET all addresses

const getAll = async (req, res)=>{
    const addresses = await Address.find();
    res.json(addresses)
}

const getById = async (req, res)=>{
    const addresses = await Address.findById(req.params.addressId);
    res.json(addresses)
}

//Delete
const deleteAddress = async (req, res)=>{
    const removedAddress = await Address.findByIdAndDelete({ _id: req.params.addressId })
    res.json(removedAddress)
}

// UPDATE a specific address
const editAddress = async (req, res) => {
    const updatedAddress = await Address.updateOne(
      { _id: req.params.addressId },
      {
        $set: {
          country: req.body.country,
          department: req.body.department,
          state: req.body.state,
          nomenclature: req.body.nomenclature,
        },
      }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }

//Delete Many 



module.exports = {
  createAddress,
  getAll,
  getById,
  deleteAddress,
  editAddress
}