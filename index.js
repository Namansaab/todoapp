const express = require("express");
const TodoTask = require("./models/TodoTask");

const app = express();
app.use(express.static(__dirname + 'public'));
// app.use(express.static("public"));

const dotenv = require('dotenv');
dotenv.config();

// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
//connection to db
// mongoose.set("useFindAndModify", false);
// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
// console.log("");
// app.listen(3000, () => console.log("Server Up and running"));
// });

// mongoose.connect(process.env.DB_CONNECT).then(()=>{console.log('Connected to db!');
// app.listen(3000, () => console.log("Server Up and running"));
// });

mongoose.connect(process.env.DB_CONNECT, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
console.log('Connected to MongoDB');
server = app.listen(3000, () => {
  console.log(`Listening to port ${3000}`);
});
});


app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
// res.send("hello ");
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    //  res.send("Helo world");
    });
    });
    
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });

//UPDATE
app
.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
TodoTask.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});


//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });


//  app.listen(3000, () => console.log("Server Up and running !!!!!!"));