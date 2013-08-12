
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


db = mongoose.connect('mongodb://localhost/inescAgenda');
Customer = require('./models/customer.js');
Meeting = require('./models/meeting.js');


app.get('/users', user.list);

app.get('/',function(req,res){
	res.render('index.jade',{
			title: "Inesc Agenda"
	})
})



//////////////// LIST ///////////////////////
app.get('/customers.:format?',function(req,res){
	Customer.find(function(customers){
		switch(req.params.format){
			case 'json':
				res.send(customers.map(function(c){
					return c;
				}));
				break;
			default:
				res.render('meetings_customers/index.jade',{type: "customer",list: customers})
		}
	});
});


///////////////////////// CREATE  ///////////////////////
///////// ------------ Create customer
app.get('/customers/new', function(req, res) {
  res.render('meetings_customers/new.jade', {type: 'customer', d: new Customer({name:'',mobile:'',address:''}) });
});

app.post('/customers.:format?',function(req,res){
	var customer = new Customer(req.body['customer']);
	customer.save(function(){
		switch(req.params.format){
			case 'json':
				res.send(customer.__doc);
			break;
			default:
				res.redirect('customers/');
		}
	});
});



///////////////////////// EDIT  ///////////////////////
//Edit customer
app.get('/customers/:id.:format?/edit', function(req, res) {
	Customer.findById(req.params.id,function(customer){
		  res.render('meetings_customers/edit.jade', {type: 'customer', d: customer});
	});
});

//Update customer
app.put('/customers/:id.:format?',function(req,res){
	Customer.findById(req.params.id,function(customer){
		customer.name = req.body.customer['name'];
		customer.mobile = req.body.customer['mobile'];
		customer.address = req.body.customer['address'];
		customer.save(function(){
			switch(req.params.format){
				case 'json':
					res.send(d.__doc);
					break;
				default:
					res.redirect('/meetings_customers');
			}
		});
	});
});













////////////////////////// Meetings ///////////////////////////////
app.get('/meetings.:format?',function(req,res){
	Meeting.find(function(meetings){
		switch(req.params.format){
			case 'json':
				res.send(meetings.map(function(c){
					return c;
				}));
				break;
			default:
				res.render('meetings_customers/index.jade',{type: 'meeting',list: meetings})
		}
	});
});


///////////////////// Create Meeting /////////////////////
app.get('/meetings/new', function(req, res) {
	res.render('meetings_customers/new.jade', {type: 'meeting', d: new Meeting({boss:'',client:'',date:'',location:''}) });
});


app.post('/meetings.:format?',function(req,res){
	var meeting = new Meeting(req.body['meeting']);
	meeting.save(function(){
		switch(req.params.format){
			case 'json':
				res.send(meeting.__doc);
			break;
			default:
				res.redirect('meetings/');
		}
	})
})



///////////////////////// EDIT  ///////////////////////
//Edit Meeting
app.get('/meetings/:id.:format?/edit', function(req, res) {
	Meeting.findById(req.params.id,function(meeting){
		  res.render('meetings_customers/edit.jade', {type: 'meeting', d: meeting});
	});
});

//Update Meeting
app.put('/meetings/:id.:format?',function(req,res){
	Meeting.findById(req.params.id,function(meeting){
		meeting.boss = req.body.meeting['boss'];
		meeting.client = req.body.meeting['client'];
		meeting.date = req.body.meeting['date'];
		meeting.location = req.body.meeting['location']
		meeting.save(function(){
			switch(req.params.format){
				case 'json':
					res.send(d.__doc);
					break;
				default:
					res.redirect('meetings/');
			}
		});
	});
});

























http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
