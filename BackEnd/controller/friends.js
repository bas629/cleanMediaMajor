const account = require("../models/accountpost");

exports.Private_Friend= async (req, res) => {
    try{
        //fetch data from req body 
        const {_id,id} = req.body;
     
        const udpatedfriend = await account.findByIdAndUpdate(id, {$push:{private_friends: _id} }, {new :true})
        const udpatedfriend1 = await account.findByIdAndUpdate(_id, {$push:{protected_friends: id} }, {new :true})
        res.json({
            post:udpatedfriend,
            post1:udpatedfriend1,
        });

    }
    catch(err) {    console.log(err);
        return res.status(500).json({
            error: err,
             
        });

    
    }
};

exports.Protected_Friend= async (req, res) => {
    try{
        //fetch data from req body 
        const {_id,id} = req.body;
     
        const udpatedfriend = await account.findByIdAndUpdate(id, {$push:{protected_friends: _id} }, {new :true})
     
        res.json({
            post:udpatedfriend,
        });

    }
    catch(err) {    console.log(err);
        return res.status(500).json({
            error: err,
             
        });

    
    }
};