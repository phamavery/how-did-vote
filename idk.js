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
const congressNumber = 116;
var whatToFetch = 'https://api.propublica.org/congress/v1/' + congressNumber + '/' + myChamber + '/members.json';
function search() {
	fetch(whatToFetch, {
	headers: {
		'X-API-Key': 'API-KEY',
	},
	})
	.then(response => response.json())
	.then(data => {
	var names = [];
	for(const {first_name, last_name} of data.results.members){
		names.append({first_name,last_name});
	}
	})
	.catch((error) => {
	console.error('Error:', error);
	});

}
