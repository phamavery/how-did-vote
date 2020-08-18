let myState;
document.getElementById("selectstate").addEventListener("change", function (e) {
	myState = e.target.value;
});

let myChamber;
document.getElementById("selectchamber").addEventListener("change", function (e) {
	myChamber = e.target.value;
	if(myChamber == "house") {
		document.getElementById("district").className = "inline-display";
		document.getElementById("senator").className = "initially-invisible";
	}
	else if(myChamber == "senate") {
		document.getElementById("district").className = "initially-invisible";
		document.getElementById("senator").className = "inline-display";
	}
	else{
		document.getElementById("district").className = "initially-invisible";
		document.getElementById("senator").className = "initially-invisible";
	}
});

let mySenator;
document.getElementById("selectsenator").addEventListener("change", function (e) {
	mySenator = e.target.value;
});

let myDistrict = 1;
document.getElementById("selectdistrict").addEventListener("change", function (e) {
	myDistrict = e.target.value;
});

const congressNumber = 116;

function search() {
	var myHeader = new Headers();
	myHeader.append('Content-Type','application/json');
	myHeader.append('X-API-Key','API-KEY');
	if(myChamber == "house") {
		var url = 'https://api.propublica.org/congress/v1/members/house/' + myState + '/' + myDistrict + '/current.json';
	} else {
		var url = 'https://api.propublica.org/congress/v1/members/senate/' + myState + '/current.json';
	}
	
	fetch(url, {
		method: 'GET', 
		headers: myHeader
	})
	.then(response => response.json())
	.then(data => {
		 if(myChamber == "house") {
			var memberId = data.results[0].id
			var voteUrl = 'https://api.propublica.org/congress/v1/members/' + memberId + '/votes.json'
		 	fetch(voteUrl, {
		 		method: 'GET',
		 		headers: myHeader
		 	})
		 	.then(resp => resp.json())
		 	.then(data2 => {
		 		for(const{description, position} of data2.results[0].votes){
					 console.log({description, position})
				 }
		 	})
		 }
		 else {

		 }
		
	})


}
