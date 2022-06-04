const Collab = require('../model/listOfData');


const addTaskMiddleWare = async (req,res,next)=>{
//object destructuring is used so that we dont have to write req.body.title
const {selfInfoId, title, createDate, startDate, endDate, progress, priority}=req.body;
// Subdocument filter using ID
    try{
    if(!selfInfoId || !title || !createDate || !startDate || !endDate || !progress || !priority) //validation to check that all data are there.
        {
            return res.status(422).json({error:"Add data in fields"});
        }
        else{
            console.log(selfInfoId);
                if(selfInfoId.search(`a`)>=0){
                console.log("attendees")
                Collab.findOneAndUpdate({ "attendees.id": selfInfoId }, //query
                {$push:{
                    "attendees.$[selfId].tasks":{       //update
                        "title": title,
                        "createDate": createDate,
                        "startDate": startDate,
                        "endDate": endDate,
                        "progress": progress,
                        "priority": priority
                    }
                    }
                },{
                "arrayFilters":[            //option
                    {
                        "selfId.id": selfInfoId
                    }
                ]
                },
                function (error, success) {
                    if (error) {
                        res.status(500).json({error:"Failed to enter the task"});
                        console.log(error);
                    } else {
                        res.status(201).json({message:"Task entered successfuly"});
                    }
                  }
            );
            next();
            }
            else{
                console.log("hosts")
                Collab.findOneAndUpdate({ "hosts.id": selfInfoId },
                {$push:{
                    "hosts.$[selfId].tasks":{
                        "title": title,
                        "createDate": createDate,
                        "startDate": startDate,
                        "endDate": endDate,
                        "progress": progress,
                        "priority": priority
                    }
                    }
                },{
                "arrayFilters":[
                    {
                        "selfId.id": selfInfoId
                    }
                ]
                },
                function (error, success) {
                    if (error) {
                        res.status(500).json({error:"Failed to enter the task"});
                      console.log(error);
                    } else {
                        res.status(201).json({message:"Task entered successfuly"});
                    }
                  }
            );
            next();
            }
            
        }
    

}catch(err){
    res.status(401).send("Not valid")
    console.log(err);
}

}
module.exports = addTaskMiddleWare;