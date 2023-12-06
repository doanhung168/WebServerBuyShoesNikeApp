const Cart = require('../model/Cart')


const CartController ={
    create:async(req,res) =>{
       try {
        const cartNumber = await Cart.countDocuments({idU:req.body.idU})
        if(cartNumber>0){
            return res.json({ success: false, message: 'Exist shoes', data: null })
        }
        const cart = new Cart(req.body)
        console.log(req.body);
        await cart.save()
        return res.json(cart)
       } catch (error) {
        return res.json({ success: false, message: error.message, data: null })
       }
    },
    get:async(req,res) =>{
       try {
        let cart = await Cart.where({"idU":req.params.idU})
        return res.json(cart[0])
       } catch (error) {
        return res.json({ success: false, message: error.message, data: null })
       }

    },
    delete:async(req,res)=>{
        try{
            var objS = await Cart.findByIdAndDelete(req.params.id)
            res.json(objS)
        }catch(error){
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    updateAddress:async(req,res) =>{
        try {
            objCart = await Cart.findById(req.params.id)
            let newObjCart = new Cart()
            newObjCart._id = req.params.id
            newObjCart.idAddress = req.body.idAddress
            newObjCart.idU = objCart.idU
            newObjCart.idShipping= objCart.idShipping
            newObjCart.createdDate= objCart.createdDate
            newObjCart.idShoesToCart = objCart.idShoesToCart
            await Cart.findByIdAndUpdate(req.params.id,newObjCart)
            return res.json(newObjCart)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    updateShipping:async(req,res)=>{
        try {
            objCart = await Cart.findById(req.params.id)
            let newObjCart = new Cart()
            newObjCart._id = req.params.id
            newObjCart.idAddress = objCart.idAddress
            newObjCart.idU = objCart.idU
            newObjCart.idPromo = objCart.idPromo
            newObjCart.idShipping= req.body.idShipping
            newObjCart.createdDate= objCart.createdDate
            newObjCart.idShoesToCart = objCart.idShoesToCart
            await Cart.findByIdAndUpdate(req.params.id,newObjCart)
            return res.json(newObjCart)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    updateTotalPrice:async(req,res)=>{
        try {
            objCart = await Cart.findById(req.params.id)
            let newObjCart = new Cart()
            newObjCart._id = req.params.id
            newObjCart.idAddress = objCart.idAddress
            newObjCart.idU = objCart.idU
            newObjCart.idShipping= objCart.idShipping
            newObjCart.totalPrice = req.body.totalPrice
            newObjCart.createdDate= objCart.createdDate
            newObjCart.idShoesToCart = objCart.idShoesToCart
            await Cart.findByIdAndUpdate(req.params.id,newObjCart)
            return res.json(newObjCart)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
    
}
module.exports = CartController