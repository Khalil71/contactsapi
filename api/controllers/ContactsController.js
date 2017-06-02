/**
 * ContactsController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var _ = require('lodash');
module.exports = {
	//for adding a new Contact
	addNewContact:function(req, res, next){
		//setting req.param to the x to save time
		var x = req.param;
		// make sure the keys intered through the client side (postman) are equal to the values set
		if(x('authorization') === 'authCode' && x('deviceToken') === 'devToken' && x('fingerPrint') === 'fPrint'){
			//saving all values entered to the Mongo loacl DB and disgarding the authorization, deviceToken and fingerPrint bec they were not part of the shecma
			Contacts.create(req.params.all(), function conatctCreated(err, conts){
				//if the collection was not created in the DB the err is sent to the client informing them with the error
				if(err) return next(err);
				//adding the status code 200(ok), the success message and the collection to the response
				x = {stautsCode: 200, message:'Successful process', data:conts};
				//if succesful the collection will be sent back to the client in json format with a 200(ok) status code
				return res.json([200], x);
			});
			//if any of the authorization, deviceToken and fingerPrint are incorrect or missing 404(not found) status code will be sent with the message to the client
		}else{
			res.send([404], 'Please Check your keys');
		}
	},
	//for getting all the contact list
	fundUserContacts:function(req, res, next){
		var x = req.param;
		if(x('authorization') === 'authCode' && x('deviceToken') === 'devToken' && x('fingerPrint') === 'fPrint'){
			//by not specfing anything in the find metod all the contacts will be selected
			Contacts.find().exec(function aftrFind(err, conts){
				//using .exec because find() will not work unless followed by .exec
				if(err) return next(err);

				x = {stautsCode: 200, message:'Successful process', data:conts};
				//will return all the contacts with a status code of 200(ok)
				return res.json([200], x);
			});
		}else{
			res.send([404], 'Please Check your keys');
		}
	},
	//for getting the recent contacts
	recentContacts:function(req, res){
		var x = req.param;
		if(x('authorization') === 'authCode' && x('deviceToken') === 'devToken' && x('fingerPrint') === 'fPrint'){
			//to select all contacts
			var myQuery = Contacts.find();
			//the sort() method takes the key the you want it to be sorted by and the order ASC for ascending and DESC for descending
			myQuery.sort('createdAt DESC');
			//just like the find() method the sort() method wont return the contacts...simple function takes 2 parameters the error and the result if succesful
			myQuery.exec(function sorting(err, conts){
    		if(err) return next(err);
				//Picking the latest five collections from the collections array using the slice method
				var recentFive = conts.slice(0, 5)
				//returns the contacts to the client orded ascendingly by according to date and time
				x = {stautsCode: 200, message:'Successful process', data:recentFive};
				return res.json([200], x);
    	});
	} else {
		res.send([404], 'Please Check your keys');
	}
	}
};
