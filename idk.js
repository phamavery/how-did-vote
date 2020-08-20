// Finds selected state, chamber, district or senator
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
// end find

// Current congress is the 116th congress serving from Jan 3 2017 - Jan 3 2021
const congressNumber = 116;

// Activates on click of search button
// Searches voting records of member selected and builds
// HTML table of voting records. Displays voting records in
// multiples of 20 which is adjustable in variable offsetCount
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
		var offsetCount = 5; // Increase to show more votes
		// Since there is only one rep to a district, no need to find the rep
		 if(myChamber == "house") {
			document.getElementById('repname').innerHTML = '<p>' + data.results[0].name + '\'s (' + data.results[0].party +') voting record is: </p>';
			for(i = 0; i < offsetCount; i++) {
				var voteUrl = getVoteUrl(data.results[0].id, i*20)
				fetch(voteUrl, {
					method: 'GET',
					headers: myHeader
				})
				.then(resp => resp.json())
				.then(dataH => {
					const voteData = []
					for(i = 0 ; i < dataH.results[0].votes.length ; i++) {
						var description = dataH.results[0].votes[i].description
						var billTitle = dataH.results[0].votes[i].bill.title
						var date = dataH.results[0].votes[i].date
						var position = dataH.results[0].votes[i].position
						voteData.push({description, billTitle, date, position})
					}
					createTable(voteData)
				})
			}
			
		 }
		 else {
			// 2 senators to a state, find which one user selected
			var whichSen = whichSenator(mySenator, data);
			document.getElementById('repname').innerHTML = '<p>' + data.results[whichSen[1]].name + '\'s (' + data.results[whichSen[1]].party + ') voting record is: </p>';
			for(i = 0 ; i < offsetCount; i++) {
				var voteUrl = getVoteUrl(whichSen[0], i*20)
				fetch(voteUrl, {
					method: 'GET',
					headers: myHeader
				})
				.then(respS => respS.json())
				.then(dataS => {
					const voteData = []
					for(i = 0 ; i < dataS.results[0].votes.length ; i++) {
						var description = dataS.results[0].votes[i].description
						var billTitle = dataS.results[0].votes[i].bill.title
						var date = dataS.results[0].votes[i].date
						var position = dataS.results[0].votes[i].position
						voteData.push({description, billTitle, date, position})
					}
					createTable(voteData)
				})
			}
			}
			
		
	})


}

// Finds which senator was selected and returns the member id for that senator and the index
function whichSenator(name, data) {
	var nameSplit = name.split(" ")
	var firstSenator = [data.results[0].id, 0];
	var secondSenator = [data.results[1].id, 1];
	// No middle name or any of that other shit
	if(nameSplit.length == 2) {
		if(nameSplit[0] == data.results[0].first_name && nameSplit[1] == data.results[0].last_name){
			return firstSenator;
		}
		else {
			return secondSenator;
		}
	}
	// Middle name. Just ignore it
	if(nameSplit.length > 2) {
		if(nameSplit[0] == data.results[0].first_name && nameSplit[2] == data.results[0].last_name){
			return firstSenator;
		}
		else {
			return secondSenator;
		}
	}
}

// Returns api url of specific member
function getVoteUrl(memberId, offset = 0)  {
	return 'https://api.propublica.org/congress/v1/members/' + memberId + '/votes.json?offset=' + offset;
}

// Creates HTML table
function createTable(data) {
	var table = document.getElementById('tableBody');
	document.getElementById('myTable').className = 'inline-display';
	for(i = 0; i < data.length; i++) {
		if(data[i].billTitle == null) {
			var row = `<tr> 
								<td>${data[i].description}</td>
								<td>${data[i].date}</td>
								<td>${data[i].position}</td>
						</tr>`
		} else {
			var row = `<tr> 
								<td>${data[i].billTitle}</td>
								<td>${data[i].date}</td>
								<td>${data[i].position}</td>
						</tr>`
		}
		table.innerHTML += row;
	}
	table.innerHTML += `<tr>
							<td>|----|</td>
							<td>|----|</td>
							<td>|----|</td>
						</tr>`;
}
