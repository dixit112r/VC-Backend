const express = require('express');
const router = express.Router();
const allData = require('../middleware/allData')


router.get('/data',allData,(req,res)=>{
    console.log('Data displayed on the webpage');
    res.send(req.list);
})

module.exports = router;