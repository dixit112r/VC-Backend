const dotenv = require("dotenv"); // require this to use the dotenv file
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'}); // where we have hide the mongodb url and port number

require('./db/conn'); //to make the connection

//const Task = require('./model/addTaskSchema'); //we can use this schema model anywhere
// const Collab = require('./model/listOfData');

// app.get('/',async (req,res)=>{
//     const data = await Collab.find({}).then((result)=>{
//         console.log(result);
//         res.json(result);
        
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         })
//     })
// })

/*

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text }),
            },
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    }, res);
});
*/



app.use(express.json()); //to get the json data in json fomart otherwise it will show us undefined
app.use(require('./router/Data')); //we link the router files to make our route easy
app.use(require('./router/addTask'));
app.use(require('./router/editTask'));

const PORT= process.env.PORT; //for port number which hidden in env file



app.listen(PORT, ()=>{
    console.log(`Server is running at port no ${PORT}`);
});


