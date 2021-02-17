var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer= require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.render('index');
})
app.get('/about', function(req, res){
    res.render('about');
})
app.get('/contact', function(req, res){
    res.render('contact');
})

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.createTransport({ 
        service:'Gmail',
        auth:{
            user:'',
            pass: ''
        }
    });
  var mailOptions = {
      from:'Adyasha <>',
      to: '',
      subject: 'Website Submission',
      text:'you have submission with following details... Name:'+req.body.name+'Email:'+req.body.email+'Message:'+req.body.message,
      html: '<p>The submission with the following details..</p><ul><li>Name '+req.body.name+'</li><li>Email '+req.body.email+'</li><li>Message '+req.body.message+'</li></ul>'

  };
  transporter.sendMail(mailOptions,function(err,info){ 
      if(err){
          console.log(err);
          res.redirect('/');
      }
       else{
           console.log('Message sent: '+info.response);
           res.redirect('/');
       }   
      
  })
})
app.listen(5000);

console.log('Server is running on port 3000')