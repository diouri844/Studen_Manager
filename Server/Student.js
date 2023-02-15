
// student is defined by a first name, a last name, a date of birth, and an email
// import mongos package 
const mongodb = require('mongoose');




// import schema handler :
const Schema = mongodb.Schema;



// create new schema : 

const StudenSchema = new Schema({
	/* the structur of an todo object  */
		Fname:{
			type:String,
			required:true
		},
		Lname:{
			type:String,
			required:true	
		},
        Email:{
            type:String,
            required:true
        },
		BirthDate:{
			type:Date,
			required:true
		}
	},
	{
		/* generate a time create automaticly for us*/
		timestamps:true
	}
);

// now after setup the schema we should seting up a modal 
// modal is an interface to interact with a specific schema : 

const Student = mongodb.model("Student",StudenSchema);

// the last step is to export the Todo model : 

module.exports = Student;