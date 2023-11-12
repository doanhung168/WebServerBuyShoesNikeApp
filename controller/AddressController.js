const Address = require('../model/Address')

const AddressController ={
    create : async(req,res) =>{
        try {
            if(req.body.default == true){
                const addressDefault = await Address.where({'idU':req.body.idU}).where({'default':true})
                if(addressDefault!=null){
                   addressDefault.forEach(async(objTrue) =>{
                    const objAr = new Address()
                    objAr._id = objTrue._id
                    objAr.name = objTrue.name
                    objAr.address = objTrue.address
                    objAr.default = false
                    try {
                        await Address.findByIdAndUpdate(objTrue._id,objAr)
                    } catch (error) {
                        console.log(error);
                    }
                   })
                }
                const address = new Address(req.body)
                await address.save()
                return res.json({address})
            }
            const address = new Address(req.body)
            await address.save()
            return res.json({ success: true, message: null, data: address })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    get :async(req,res) =>{
        try {
            var listAddress = await Address.find({'idU':req.params.idU})
            return res.json(listAddress)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    getById:async(req,res) =>{
        try {
            let address =await Address.findById(req.params.id)
            return res.json(address)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}

module.exports = AddressController