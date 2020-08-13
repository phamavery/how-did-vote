const data = require('./senators.json');
function getState() {
	var myState = index.getElementById("selectstate").value;
}

function getChamber() {
	var myChamber = index.getElementById('selectchamber').value;
}

function getDistrict() {
	var myDistrict = index.getElementById('selectdistrict').value;
}

function getSenator() {
	var mySenator = index.getElementById('selectsenator').value;
}
getState();
console.log(myState);