const express=require('express');

const path=require('path');

const port=8000;

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/',function(request,response)
{
   
   return response.render('home',{title:"I am rahul !!!"});
});
app.get('/practice',function(request,response){
    return response.render('practice',{
        title:"Let play with ejs"
    });
});

app.listen(port,function(err){
    if(err)
    {
        console.log('Error in the running server',err);
    }
    console.log('Yupp!!! the server is running with port',port);
});