require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
// initialise express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//  mondodb connect
mongoose.connect(
    "mongodb+srv://Pravesh:Pravesh%402655@razor.5jfiohz.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// create a schema
const studentSchema = new mongoose.Schema({
    roll_no: Number,
    name: String,
    year: Number,
    subjects: [String]
});

const usersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String
})

// create a model with studentSchema
const Student = mongoose.model('Student', studentSchema);
const Users = mongoose.model('users', usersSchema);

// Create a new document
const stud = new Student({
    roll_no: 1,
    name: 'Anurag Salian',
    year: 21,
    subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
});
// Add the document to Collections
// stud.save().then(() => console.log("One entry added"), (err) => console.log(err));




// get documents
app.get('/', (req, res) => {
    Student.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).catch(err => console.log("Error occured, " + err));
});

app.post('/adduser', (req, res) => {
    const { name, age, gender } = req.body;
    const details = new Users({
        name: name,
        age: age,
        gender: gender
    });
    details.save().then(() => Users.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).catch(err => console.log("Error occured, " + err)));
})


app.get('/users', (req, res) => {
    Users.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).catch(err => console.log("Error occured, " + err));
});

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));