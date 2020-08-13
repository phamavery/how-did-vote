const data = require('./senators.json');
let myState;
document.getElementById("selectstate").addEventListener("change", function (e) {
	console.log(e);  
	myState = e.target.value;
});
let myChamber;
document.getElementById("selectchamber").addEventListener("change", function (e) {
	console.log(e);
	myState = e.target.value;
});

