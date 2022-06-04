const Collab = require('../model/listOfData');


const editTaskMiddleWare = async (req,res,next)=>{
//object destructuring is used so that we dont have to write req.body.title
const {selfInfoId, _id, title, createDate, startDate, endDate, progress, priority}=req.body;
// Subdocument filter using ID
    try{
    if(!selfInfoId || !title || !createDate || !startDate || !endDate || !progress || !priority) //validation to check that all data are there.
        {
            return res.status(422).json({error:"Add data in fields"});
        }
        else{
            console.log(selfInfoId);
            console.log(_id);
                if(selfInfoId.search(`a`)>=0){
                console.log("attendees")
                Collab.findOneAndUpdate({ "attendees.id": selfInfoId }, //query
                {$set:{
                    "attendees.$[selfId].tasks.$[taskId]":{       //update
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
                    },{
                        "taskId._id": _id
                    }
                ]
                },
                function (error, success) {
                    if (error) {
                        res.status(500).json({error:"Failed to update the task"});
                        console.log(error);
                    } else {
                        res.status(201).json({message:"Task updated successfuly"});
                    }
                  }
            );
            next();
            }
            else{
                console.log("hosts")
                Collab.findOneAndUpdate({ "hosts.id": selfInfoId },
                {$set:{
                    "hosts.$[selfId].tasks.$[taskId]":{
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
                        },{
                            "taskId._id": _id
                        }
                    ]
                },
                function (error, success) {
                    if (error) {
                        res.status(500).json({error:"Failed to update the task"});
                      console.log(error);
                    } else {
                        res.status(201).json({message:"Task updated successfuly"});
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
module.exports = editTaskMiddleWare;