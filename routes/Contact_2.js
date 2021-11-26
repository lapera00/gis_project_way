var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  memo:{type:String},
  image : {
     data : Buffer,
     contentsType : String
},
});

var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
