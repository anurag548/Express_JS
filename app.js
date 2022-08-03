const express = require('express');

const app = express();
const PORT = 3000;
// app.get('/', (req, res)=>{
//     res.status(200);
//     res.send("Welcome to root URL of Server");
// });

app.get('/all', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello Learner!</h1>");
});
app.use(express.json());
app.post('/', (req, res)=>{
    const {name} = req.body;
    const {age} = req.body;
    const {gender} = req.body;
    res.send(`Welcome ${name} your age is ${age} and gender is ${gender}`);
})


app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
