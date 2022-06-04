const express = require('express');
const router = express.Router();
const addTaskMiddleWare = require("../middleware/addTaskMiddleWare");


router.post('/addTask',addTaskMiddleWare,(req,res)=>{
    console.log('Task Added successfully');
    //res.send(req.list);
})

module.exports = router;


//GET to retrieve a resource; 
//get request will read the data from database
//PUT to change the state of or update a resource, which can be an object, file or block; 
//post request will create the data in database
//POST to create that resource; and
//DELETE to remove it.

/*---this will give us undefined error in console
router.post('/addTask',(req,res)=>{
    console.log(req.body);
    //for this we need get request from frontend
    res.send("add Task page"); 
    res.json({tasks:req.body}); //to show the response data in json type
});

*/

/* Using Promises 
router.post('/addTask',(req,res)=>{
    //object destructuring is used so that we dont have to write req.body.title
    const {title,startDate,endDate,progress,priority}=req.body;
    
    if(!title || !startDate || !endDate || !progress || !priority) //validation to check that all data are there.
    {
        return res.status(422).json({error:"Add data in fields"});
    }
    Task.findOne({title:title})//Use this to find the same value is available in the database or not
    .then((titleExist)=>{
        if(titleExist){
        return res.status(422).json({error:"Already exist"});
        }
        const task = new Task({title,startDate,endDate,progress,priority}); //storing the data which we got from the client and save it

        task.save().then(()=>{ //this will save the data into database
            res.status(201).json({message:"Task entered successfuly"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter the task"}));
    }).catch(err=>{console.log(err)});
});
*/

/* Using async await
    router.post('/addTask', async (req,res)=>{
    //object destructuring is used so that we dont have to write req.body.title
    const {title,startDate,endDate,progress,priority}=req.body;
    
    if(!title || !startDate || !endDate || !progress || !priority) //validation to check that all data are there.
    {
        return res.status(422).json({error:"Add data in fields"});
    } 
    try{
        const titleExist = await Task.findOne({title:title});//Use this to find the same value is available in the database or not
        if(titleExist){ // is title already available or not
            return res.status(422).json({error:"Already exist"});
        }
        const task = new Task({title,startDate,endDate,progress,priority}); //storing the data which we got from the client and save it
        const taskAdd  = await task.save();
        if(taskAdd){ // task is saved or not
            res.status(201).json({message:"Task entered successfuly"});
        }
        else{
            res.status(500).json({error:"Failed to enter the task"});
        }
    }
    catch(err){
        console.log(err);
    }
});
*/

