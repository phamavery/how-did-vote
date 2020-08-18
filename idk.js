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
			var voteUrl = getVoteUrl(data.results[0].id)
		 	fetch(voteUrl, {
		 		method: 'GET',
		 		headers: myHeader
		 	})
		 	.then(resp => resp.json())
		 	.then(dataH => {
				const voteData = []
				for(i = 0 ; i < dataH.results[0].votes.length ; i++) {
					var description = dataH.results[0].votes[i].description
					var position = dataH.results[0].votes[i].position
					var billId = dataH.results[0].votes[i].bill.bill_id 
					var billTitle = dataH.results[0].votes[i].bill.title
					voteData.push({description, position, billId, billTitle})
				}
				console.log(voteData)
		 	})
		 }
		 else {
			var whichSen = whichSenator(mySenator, data);
			var voteUrl = getVoteUrl(whichSen)
			fetch(voteUrl, {
				method: 'GET',
				headers: myHeader
			})
			.then(respS => respS.json())
			.then(dataS => {
				const voteData = []
				for(i = 0 ; i < dataS.results[0].votes.length ; i++) {
					var description = dataS.results[0].votes[i].description
					var position = dataS.results[0].votes[i].position
					var billId = dataS.results[0].votes[i].bill.bill_id 
					var billTitle = dataS.results[0].votes[i].bill.title
					voteData.push({description, position, billId, billTitle})
				}
				console.log(voteData)
			})
		 }
		
	})


}

// Finds which senator was selected and returns the member id for that senator
function whichSenator(name, data) {
	var nameSplit = name.split(" ")
	// No middle name or any of that other shit
	if(nameSplit.length == 2) {
		if(nameSplit[0] == data.results[0].first_name && nameSplit[1] == data.results[0].last_name){
			return data.results[0].id;
		}
		else {
			return data.results[1].id;
		}
	}
	// Middle name. Just ignore it
	if(nameSplit.length > 2) {
		if(nameSplit[0] == data.results[0].first_name && nameSplit[2] == data.results[0].last_name){
			return data.results[0].id;
		}
		else {
			return data.results[1].id;
		}
	}
}

function getVoteUrl(memberId)  {
	return 'https://api.propublica.org/congress/v1/members/' + memberId + '/votes.json'
}
