const mongodb = require('mongoose');
mongodb.set('strictQuery', true);

const makeConnexion = ()=>{
	// make connexion to mongodb : 
	mongodb.connect(
        "mongodb+srv://salahiddine:Nn123456789@cluster0.prmreix.mongodb.net/?retryWrites=true&w=majority"
    )
	.then((response)=>{
		// connecion success :
		console.log(" :-: connected to mongodb ");
	})
	.catch(
		(error)=>{
		console.error(" connexion error ", error);
	});
}

module.exports ={ makeConnexion };