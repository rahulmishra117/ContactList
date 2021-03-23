const { urlencoded } = require('express');
const express=require('express');

const path=require('path');
const { brotliDecompressSync } = require('zlib');

const port=8000;

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
   
   return response.render('home',
   {
       title:"ContacList",
       contact_list:contactlist

});
});
app.get('/practice',function(request,response){
    return response.render('practice',{
        title:"Let play with ejs"

    });
});

app.post('/create-contact',function(request,response){
        contactlist.push({
            name:request.body.name,
            phone:request.body.phone
        });
        return response.redirect('/');
});


app.get('/delete-contact/',function(request,response){
    console.log(request.query);
    let phone=request.query.phone;
    let constactIndex=contactlist.findIndex(contact => contact.phone==phone);
    if(constactIndex!= -1){
        contactlist.splice(constactIndex,1);

    }
    return response.redirect('back');

});

app.listen(port,function(err){
    if(err)
    {
        console.log('Error in the running server',err);
    }
    console.log('Yupp!!! the server is running with port',port);
});