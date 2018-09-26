 // Javasript file for index.html page
 
 //***********FIREBASE STUFF*************
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDrpyVDYQeJ4lBe1KgccvhrISzmrbvsKv4",
    authDomain: "website-41806.firebaseapp.com",
    databaseURL: "https://website-41806.firebaseio.com",
    projectId: "website-41806",
    storageBucket: "website-41806.appspot.com",
    messagingSenderId: "158190104841"
 };
  firebase.initializeApp(config);
 
//********** WRITING TO THE DATABASE *************
// Reference booknames collection
var bookInfoRef = firebase.database().ref('bookinfo');

//html form 
document.getElementById('inputform').addEventListener('submit',submitForm);  

//defining submitForm function
function submitForm(e){
	e.preventDefault();
	
	//Get values
	var bookname = getInputVal('bookname');
	var isbn = getInputVal('isbn');
	var edition = getInputVal('edition');
	var author = getInputVal('author');
	var picture = getInputVal('picture');
	var price = getInputVal('price');
	var contactinfo = getInputVal('contactinfo');
	
	// Save Book Info
	saveBookInfo(bookname, isbn, edition, author, picture, price, contactinfo);
	
	
}

// Function to get form values
function getInputVal(id){
	return document.getElementById(id).value;
}

// Save book book info to firebase
function saveBookInfo(bookname, isbn, edition, author, picture, price, contactinfo){
	var newBookInfoRef = bookInfoRef.push();
	newBookInfoRef.set({
		bookname:bookname,
		isbn:isbn,
		edition:edition,
		author:author,
		picture:picture,
		price:price,
		contactinfo:contactinfo
		
	});
}


// ******* READING FROM THE DATABASE *******************
// Reading data, code from youtube video
var ref = firebase.database().ref("bookinfo");
ref.on('value', gotData, errData);

function gotData(data){
	var bookinformation = data.val();
	var keys = Object.keys(bookinformation);
	//console.log(keys);
	
	for(var i=0; i<keys.length; i++){
		var k = keys[i];
		var bookname = bookinformation[k].bookname;
		var isbn = bookinformation[k].isbn;
		var author = bookinformation[k].author;
		var edition = bookinformation[k].edition;
		var price = bookinformation[k].price;
		var contactinfo = bookinformation[k].contactinfo;
		var picture = bookinformation[k].picture;
		var list = [bookname, isbn, author, edition, price, contactinfo, picture];
		makeColumn1(list)		
	}
}


// Im thinking of dividing makingTable into new functions
function makeColumn1(list){

	// creating a row to display
	var newrow = document.createElement("tr");
	var newcell = document.createElement("td");
	var booktable = document.getElementById("bookinfotable");
	//adding rows to the table
	booktable.appendChild(newrow);
	//adding cells to the rows
	newrow.appendChild(newcell);
	
	for(var i = 0; i< 4; i++){
		var listthing = document.createTextNode(list[i]);
		var ul = document.getElementById("booklist");
		var li = document.createElement("li");
		li.append(listthing);
		ul.appendChild(li);
		newcell.appendChild(li);	
	}
	//adding picture
	var picture = document.createElement("IMG");
	// TODO HAVE TO FIX THIS LATER
	//picture.setAttribute("src", "list[6]");
	//console.log("list[6]");
	var newpicturecell1 = document.createElement("td");
	newrow.appendChild(newpicturecell1);
	newpicturecell1.append(picture);
	
	// adding price and contact info
	
	var price = document.createTextNode(list[4]);
	var newpicturecell2 = document.createElement("td");
	newrow.appendChild(newpicturecell2);
	newpicturecell2.append(price);
	
	// contact info
	var contactinfo = document.createTextNode(list[5]);
	var newpicturecell3 = document.createElement("td");
	newrow.appendChild(newpicturecell3);
	newpicturecell3.append(contactinfo);
}



function errData(err){
	console.log("Error!");
	console.log(err);
}

