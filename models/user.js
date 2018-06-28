const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
// Database Name
// const dbName = 'Ecommerce';

// Use connect method to connect to the server


/* The user schema attributes / characterstics / fields */

let UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,

  profile: {
    name :{type: String, default: ''},
    picture: { type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: {type : Number, default: 0}
  }]
})


/* Hash the password */

UserSchema.pre('save', function(callback){
  let user = this;
  if(!user.isModified('password')) return  callback();
  bcrypt.genSalt(10,(err,salt)=>{
    if (err) callback(err);
    bcrypt.hash(user.password, salt, null, (err,hash)=>{
      if (err) return callback(err);
      user.password = hash;
      callback();
    })
  })
})


/* compare password in the database and one that typed in */

UserSchema.method.comparePassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);



// exports.createUserSchema = async function () {
//   // body...
//   MongoConn.createCollection("USER", {
//      validator: {
//         $jsonSchema: {
//            bsonType: "object",
//            required: [ "email", "password"],
//            properties: {
//               email: {
//                  bsonType: "string",
//                  description: "must be a string and is required and unique"
//               },
//               password: {
//                  bsonType: "string",
//                  description: "must be a string and is required"
//               },
//               profile: {
//                 bsonType: "object",
//                 required: ["name","picture"],
//                 properties: {
//                   name :{
//                     bsonType: "string",
//                     description: "must be a string and is required"
//                   },
//                   picture :{
//                     bsonType: "string",
//                     description: "must be a string and is required"
//                   }}
//               },
//               address: {
//                  bsonType: 'string',
//                  description: "must be a string"
//               },
//               history: {
//                  bsonType: ["array"],
//                  description: "must be a double and is required",
//                  items: {
//                    bsonType: "object",
//                    properties:{
//                      date:{
//                        bsonType: "date",
//                        description: "must be date"
//                      },
//                      paid:{
//                          bsonType: ['int','decimal','double'],
//                          description: "must be in desired format .. number mainly"
//                      }
//                    }
//                  }
//               }
//            }
//         }
//      }
//   })
//   console.log('collection created');
// };



/* Hash the password */


/* Add into Database */
