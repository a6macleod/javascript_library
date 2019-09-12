let myLibrary = [];

// Get Elements
const addABookButton = document.querySelector('#new-book');
const readBooks = document.querySelector('read-books');
const notReadBooks = document.querySelector('not-read-books');

//const newTitleField = document.getElementById('#title');
//const newAuthorField = document.getElementById('#author');
//const newPagesField = document.getElementById('#pages');
//let newHaveReadRadio = document.getElementById('');


// constructor
function Book (title, author, pages, read=false) {
	
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	
	this.info = function () {
	  	  
	  return(`<span id="book_title"><strong>${title}</strong></span> was written by ${author} and is ${pages} pages long. I ${read == true ? "have" : "have not"} read this book.`);
	
	}
	
	pushToLibrary(this);

}

function addBookToLibrary(event) {
	event.preventDefault();

	let newTitle = document.querySelector('#title').value;
	let newAuthor = document.querySelector('#author').value;
	let newPages = document.querySelector('#pages').value;
	
	let checkbox = document.querySelector('.have_read');
	let newHaveRead = checkbox.checked ? true : false;

	if (validateInput(newTitle, newAuthor, newPages)) {
		let book = new Book(newTitle, newAuthor, newPages, newHaveRead);
		myLibrary.push(book);
		console.log(myLibrary);

	} else {
		return alert("Missing information on the form!");
	}
	
	clearForm();
}

function clearForm() {
	document.querySelector('#new-book').reset();
}

function validateInput(newTitle, newAuthor, newPages) {
	if (newTitle != '' && newAuthor != '' && newPages != 0) {
		return true
	}
}

function pushToLibrary(book) {
	myLibrary.push(book);
	render(book);
}

function render(addBook) {
		let bookLi = document.createElement('li');
		let listSpot = document.querySelector('#book-list');
		listSpot.appendChild(bookLi);
		bookLi.innerHTML = addBook.info();
}



// Add event listeners.
addABookButton.addEventListener('submit', addBookToLibrary);



// example books to start with
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);
const fellowship = new Book ('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true);
const twinTower = new Book ('The Twin Towers', 'J.R.R. Tolkien', 352, true);
const returnOfKing = new Book ('Return of the king', 'J.R.R. Tolkien', 416, true);

//render(myLibrary);