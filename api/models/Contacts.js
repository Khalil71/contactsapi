/**
 * Contacts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//to verifuy the email format
module.exports = {
  //setting the connection with the DB
  connection:'userMongodbServer',
  //strincting the data coming in to be applaied as per the schema
  schema:true,

  attributes: {
    firstName:{
      type:'string',
      required:true
    },
    lastName:{
      type:'string',
      required:true
    },
    email:{
    type: 'string',
    required: true,
    unique: true,
    email:true
    },
    mobile:{
      type:'string',
      required: true,
      minLength: 8,
      maxLength: 9
    },
    relationId:{
      type: 'null'
    },
    accountId:{
      type: 'null'
    },
    userId:{
      type: 'null'
    }
  }
};
