const express = require('express');
const router = express.Router();
const editTaskMiddleWare = require("../middleware/editTaskMiddleWare");


router.post('/editTask',editTaskMiddleWare,(req,res)=>{
    //console.log('Task Updated successfully');
    //res.send(req.list);
})

module.exports = router;