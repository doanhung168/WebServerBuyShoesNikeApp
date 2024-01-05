const Token = require('../model/Token')

const TokenController ={
    create:async(req,res)=>{
        try{
            const numberToken = await Token.countDocuments({token:req.body.token})
            if(numberToken>0){
                return res.json({ success: false, message: 'Exist token', data: null })
            }else{
                const token = new Token(req.body)
                await token.save()
                return res.json({ success: true, message: "create token success", data: token})
            }
        }catch(e){
            return res.json({ success: false, message: e.message, data: null })
        }
    },
    delete:async(req,res) =>{
        try{
            const result = await Token.findOneAndDelete({token:req.body.token})
            return res.json({ success: true, message: "delete token succes", data:result })
        }catch(e){
            return res.json({ success: false, message: e.message, data: null })
        }
    },
    getAll:async(req,res)=>{
        try {
            const result = await Token.find()
            return res.json({ success: true, message: "all token", data:result })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }
}

module.exports = TokenController