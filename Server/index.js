const express = require('express');
const morgan  = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');

const { makeConnexion } = require('./MongoHandler');

// import Student schema :


const Student  = require('./Student');



// use express to create new instance:
const server = express();



// add middelware :
server.use(morgan('tiny'));
//server.use(express.urlencoded({'extended':true}));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.use(cors());
// use the server : 

server.listen(3000, ()=> {
    console.log(" Your api server run in http://127.0.0.1:3000/ ");
});

// router to add new Student :

server.post("/api/Create/Student", 
    (req,res) =>{
	// set a ne blog from req body :
	makeConnexion(); 
	//console.log(req);
	console.log( req.body );
	// genrate a new Todo : 
	const toinsert = new Student({
		Fname:req.body.Fname,
		Lname:req.body.Lname,
        Email:req.body.Email,
        BirthDate:req.body.BirthDate
	});
	// insert todo to data base : 
	toinsert.save()
	.then(
        response=>{ 
			res.send(
				{ 
				Status:response,
				Message:"Student Created Successfully "
				}
			);
	})
	.catch(error => {
		res.send(error);
	});
});


// delete student by Email :

server.delete("/api/delete/Student/:email", 
    (req,res) =>{
	    makeConnexion();
	    let targetemail = req.params.email;
        console.log(
            targetemail
        );
	    // delete the target item if exist : 
	    Student.deleteOne({
		    // filter : 
		    Email:targetemail
	    })
	    .then( response => {
		    res.send(response);
	    })
	    .catch( error => {
		    res.send(error);
	    });
});



// get All student in collection :

server.get("/api/Students/",
    (req,res)=>{
	    makeConnexion();
        // fetch mongodb collection to find all todos : 
        Student.find()
        .then(response => {
            res.send(response);
			//
        })
        .catch(error => {
            res.send(
                { 
                    state : "error",
                    message:" cann not fetch data "
                }
            );
        });
});
