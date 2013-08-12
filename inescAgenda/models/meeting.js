var meetingsList = [];
 
 var id = 0;
function Meeting(data){
	this.id = id++;
	this.boss = data.boss || '';
	this.client = data.client || '';
	this.date = data.date || '';
	this.location = data.location || '';
}

var a = new Meeting({boss:'dario',client:'917837101',date:'lisboa',location:'location'})
meetingsList.push(a);


// class methods
Meeting.find = function(func) {
	func(meetingsList);
};

Meeting.prototype.save = function(fun){
	for(var i = 0; i < meetingsList.length; i++){
		if(meetingsList[i].id == this.id){
			//update
			meetingsList[i] = this;
			fun();
			return;
		}
	}
	//add
	meetingsList.push(this);
	fun();
}

Meeting.findById = function(id,fun){
	console.log(meetingsList);
	for(var i = 0; i < meetingsList.length; i++){
		if(meetingsList[i].id == id){
			fun(meetingsList[i]);
		}
	}
}

module.exports = Meeting;