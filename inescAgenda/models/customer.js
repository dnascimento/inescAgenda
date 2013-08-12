var customersList = [];
var meetingsList = [];
 
 var id = 0;
function Customer(data){
	this.id = id++;
	this.name = data.name || '';
	this.mobile = data.mobile || '';
	this.address = data.address || '';
}

var a = new Customer({name:'dario',mobile:'917837101',address:'lisboa'})
customersList.push(a);


// class methods
Customer.find = function(func) {
	func(customersList);
};

Customer.prototype.save = function(fun){
	for(var i = 0; i < customersList.length; i++){
		if(customersList[i].id == this.id){
			//update
			customersList[i] = this;
			fun();
			return;
		}
	}
	//add
	customersList.push(this);
	fun();
}

Customer.findById = function(id,fun){
	console.log(customersList);
	for(var i = 0; i < customersList.length; i++){
		if(customersList[i].id == id){
			fun(customersList[i]);
		}
	}
}

module.exports = Customer;
