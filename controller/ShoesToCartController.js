const ShoesToCart =require('../model/ShoesToCart')

const ShoesToCartController ={
    create:async(req,res)=>{
        try {
            const ShoesOdered = await ShoesToCart.where({"idU":req.body.idU}).where({"idShoes":req.body.idShoes}).where({"colorChoose":req.body.colorChoose}).where({"sizeChoose":req.body.sizeChoose})
            if(ShoesOdered!= null){
                console.log("update" + ShoesOdered);
                ShoesOdered.forEach(async(objShoes)=>{
                    const objS = new ShoesToCart()
                    objS._id = objShoes._id
                    objS.idU = objShoes.idU
                    objS.idShoes = objShoes.idShoes
                    objS.colorChoose = objShoes.colorChoose
                    objS.sizeChoose = objShoes.sizeChoose
                    objS.quantity = objShoes.quantity+req.body.quantity
                    try {
                        await ShoesToCart.findByIdAndUpdate(objShoes._id,objS)
                        res.json(objS)
                    } catch (error) {
                        return res.json({ success: false, message: error.message, data: null })
                    }
                })
            }else{
                const shoesToCart = new ShoesToCart(req.body)
                await shoesToCart.save()
                return res.json(shoesToCart)
            }
           
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }

    },
    get:async(req,res)=>{
            try {
                var listShoesToCart = await ShoesToCart.find({'idU':req.params.idU})
                res.json(listShoesToCart)
            } catch (error) {
                return res.json({ success: false, message: error.message, data: null })
            }
    },
    delete:async(req,res)=>{
        try{
            var objS = await ShoesToCart.findByIdAndDelete(req.params.id)
            res.json(objS)
        }catch(error){
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    update:async(req,res)=>{
        objS = await ShoesToCart.findById(req.params.id)
        let objShoesToCart = new ShoesToCart()
        objShoesToCart._id = req.params.id
        objShoesToCart.idU = objS.idU   
        objShoesToCart.idShoes = objS.idShoes
        objShoesToCart.quantity = req.body.quantity
        objShoesToCart.colorChoose = objS.colorChoose
        objShoesToCart.sizeChoose = objS.sizeChoose
        objShoesToCart.createdDate = objS.createdDate
        try {
            if(req.body.quantity>0){
                await ShoesToCart.findByIdAndUpdate(req.params.id,objShoesToCart)   
                res.json(objShoesToCart)
            }else{
                await ShoesToCart.findByIdAndDelete(req.params.id)
                res.json(objShoesToCart)
            }
           
           
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}


module.exports = ShoesToCartController