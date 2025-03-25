const express = require('express');
const {v4 : uuidv4} = require('uuid');
const app = express();
const port = 4500;
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let games = [
    {
        id : uuidv4(),
        title : "Fifa 22",
        genre : "Football",
        played : true
    },
    {
        id : uuidv4(),
        title : "Assasin's Creed",
        genre : "Adventure",
        played : false
    },
    {
        id : uuidv4(),
        title : "Real Cricket",
        genre : "Cricket",
        played : true
    },
    {
        id : uuidv4(),
        title : "Shadow Fight",
        genre : "Fighting",
        played : false
    },
    {
        id : uuidv4(),
        title : "House of the dead",
        genre : "Horror",
        played : true
    }
]
app.get("/",(req,res)=>{
    res.send("Hello From Home");
});

app.get("/games",(req,res)=>{
     res.status(200).json({
        "Games":games,
        "Status" : "Success"
    });
});

app.post("/games",(req,res)=>{
    const newGame = {
        id : uuidv4(),
        title:req.body.title,
        genre:req.body.genre,
        played:req.body.played
    };
    games.push(newGame);
    res.status(201).json({
        "message":"Game Added Successfully",
        "game":newGame
    });
});

app.put("/games/:id",(req,res)=>{
    const gameId = req.params.id;
    games.filter((game)=>game.id === gameId)
    .map((selectedGame)=>{
       selectedGame.title = req.body.title;
       selectedGame.genre = req.body.genre;
       selectedGame.played = req.body.played;
    });
    res.status(200).json({
        "games":games
    });
});

app.delete("/games/:id",(req,res)=>{
   const gameId = req.params.id; 
   games = games.filter((game)=>game.id !== gameId);
   res.status(200).json({
    "games":games
   });
});

app.use((req,res,next)=>{
   res.status(404).json({"message":"404 not found"});
});

app.use((err,req,res,next)=>{
   res.status(500).json({"message":"500 something broke"});
});

app.listen(port,()=>{
    console.log(`The server is running at http://localhost:${port}`);
});