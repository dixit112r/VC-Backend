const Collab = require('../model/listOfData');


const allData = async (req,res,next)=>{
try{
    const list = await Collab.findOne({});
    if(!list){throw new Error('list not found')}
    req.list = list;
    //console.log(list);
    next();

}catch(err){
    res.status(401).send("Unauthorised")
    console.log(err);
}

}
module.exports = allData;