let myState;
document.getElementById("selectstate").addEventListener("change", function (e) {
	myState = e.target.value;
	switch(myState) {
		case "AL":
			break;
		case "AK":
			break;
		case "AZ":
			break;
		case "AR":
			break;
		case "CA":
			break;
		case "CO":
			break;
		case "CT":
			break;
		case "DE":
			break;
		case "FL":
			break;
		case "GA":
			break;
		case "HI":
			break;
		case "ID":
			break;
		case "IL":
			break;
		case "IN":
			break;
		case "IA":
			break;
		case "KS":
			break;
		case "KY":
			break;
		case "LA":
			break;
		case "MA":
			break;
		case "MD":
			break;
		case "ME":
			break;
		case "MI":
			break;
		case "MN":
			break;
		case "MO":
			break;
		case "MS":
			break;
		case "MT":
			break;
		case "NC":
			break;
		case "ND":
			break;
		case "NE":
			break;
		case "NH":
			break;
		case "NJ":
			break;
		case "NM":
			break;
		case "NV":
			break;
		case "NY":
			break;
		case "OH":
			break;
		case "OK":
			break;
		case "OR":
			break;
		case "PA":
			break;
		case "RI":
			break;
		case "SC":
			break;
		case "SD":
			break;
		case "TN":
			break;
		case "TX":
			break;
		case "UT":
			break;
		case "VA":
			break;
		case "VT":
			break;
		case "WA":
			break;
		case "WI":
			break;
		case "WV":
			break;
		case "WY":
			break;
	}
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

