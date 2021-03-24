// This is the libary
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/contacts_list_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error is find'));

db.once('open',function(){
    console.log('Sucessfully contected to the database');
});
