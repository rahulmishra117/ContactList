const { urlencoded } = require('express');
const express=require('express');

const path=require('path');
const { brotliDecompressSync } = require('zlib');

const port=8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assests'));

app.use(express.urlencoded());


var contactlist=[
    {
        name:"rahul",
        phone:"111222"
    },
    {
        name:"Captian",
        phone:"123333"
    },
    {
        name:"Institue",
        phone:"32333"
    }
]
app.get('/',function(request,response)
{
   Contact.find({},function(err,contacts){
       if(err){
           console.log('error is find in the db');
           return ;
       }
       return response.render('home',
   {
       title:"ContacList",
       contact_list:contacts

});
   });
   
});
app.get('/practice',function(request,response){
    return response.render('practice',{
        title:"Let play with ejs"

    });
});

app.post('/create-contact',function(request,response){
        // contactlist.push({
        //     name:request.body.name,
        //     phone:request.body.phone
        // });
        Contact.create({
            name : request.body.name,
            phone: request.body.phone
        },function(err,newContact){
            if(err){
                console.log('error is occured !!!!');
                return ;
            }

            console.log('*********',newContact);
            return response.redirect('back');
        });
        // return response.redirect('/');
});


app.get('/delete-contact/',function(request,response){
    // console.log(request.query);

    let id=request.query.id;
    // let constactIndex=contactlist.findIndex(contact => contact.phone==phone);
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err){
            console.log('error is occurs!!!!');
            return ;
        }
        return response.redirect('back');
    });
    
  
    // return response.redirect('back');

});

app.listen(port,function(err){
    if(err)
    {
        console.log('Error in the running server',err);
    }
    console.log('Yupp!!! the server is running with port',port);
});