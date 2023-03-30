const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static("public"));  //Serving the static CSS file.


const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", (req, res)=>{
    let day = date(); //packed the function locally in date.js module.
    res.render("list", {listTitle: day, newListItems: items});
});


app.post("/", (req, res)=>{
    // console.log(req.body.list);
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", (req, res)=>{
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", (req, res)=>{
    res.render("about");
});


// app.post("/work", (req, res)=>{
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });



app.listen(3000, ()=>{
    console.log("Listening at port 3000");
});