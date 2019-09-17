const myLibrary = [];
let myLibraryIndex = 0;

// Get Elements
const submitABook = document.querySelector('#new-book');
const addABookButton = document.querySelector('#add-book');
const cancelNewBook = document.querySelector('#cancel');


////////////////////////////
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formCheckbox = document.querySelector('.have_read');
////////////////////////////

// constructor
function Book (title, author, pages, read=false) {
	
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.index = myLibraryIndex;
	
	this.info = function () {
	  	  
	  return(`<span id="book_title"><strong>${title}</strong></span> was written by ${author} and is ${pages} pages long. I ${read == true ? "have" : "have not"} read this book.`);
	
	}
	myLibraryIndex += 1;
	pushToLibrary(this);

}

function addBookToLibrary(event) {
	event.preventDefault();

	let newTitle = formTitle.value;
	let newAuthor = formAuthor.value;
	let newPages = formPages.value;
	
	let newHaveRead = formCheckbox.checked ? true : false;

	if (validateInput(newTitle, newAuthor, newPages)) {
		let book = new Book(newTitle, newAuthor, newPages, newHaveRead);
		myLibrary.push(book);

	} else {
		return alert("Missing information on the form!");
	}
	clearForm();
	toggleForm();
}

function clearForm() {
	formTitle.value = '';
	formAuthor.value = '';
	formPages.value = null;
	formCheckbox.checked =false;
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

function haveReadBook (addBook) {
	if (addBook.read == true) {
		return `<input type="checkbox" class="read" checked>`;
	} else {
		return `<input type="checkbox" class="read">`;
	}
}
function findBookMyLibrary (dataIndex) {
	for (obj in myLibrary) {
		book = myLibrary.find(i => i.index == dataIndex);
	}
	return book;
}

function removeBook (dataIndex) {
	const listToBeDeleted = document.querySelector(`li[data-index="${dataIndex}"]`);
	const buttonToBeDeleted = document.querySelector(`.delete-button[data-index="${dataIndex}`);
	const bookToBeDeleted = findBookMyLibrary(dataIndex);

	listToBeDeleted.remove();
	buttonToBeDeleted.remove();
	myLibrary.slice(bookToBeDeleted, 1);
}

function deleteButton(addBook) {
	return `<button type="button" class="delete-button" data-index=${addBook.index} onclick=removeBook(${addBook.index})>Remove this book</button>`;
}

function render(addBook) {
		const bookLi = document.createElement('li');
		const listSpot = document.querySelector('#book-list');
		const checkIfRead = haveReadBook(addBook);
		const removeBookButton = deleteButton(addBook);

		listSpot.appendChild(bookLi);
		bookLi.innerHTML = `<strong>${addBook.title}</strong> - Author: ${addBook.author} - Length: ${addBook.pages} pages - <span id="yes-read">Read?: ${checkIfRead}</span> -- ${removeBookButton}`
		bookLi.setAttribute('data-index', `${addBook.index}`);
}

function toggleForm() {
	const hiddenForm = document.querySelectorAll('.form');
	hiddenForm.forEach(function (element) {
		element.classList.toggle('hide-form');
	});
}


// Add event listeners.
submitABook.addEventListener('submit', addBookToLibrary);
addABookButton.addEventListener('click', toggleForm);
cancelNewBook.addEventListener('click', toggleForm);



// example books to start with
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);
const fellowship = new Book ('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true);
const twinTower = new Book ('The Twin Towers', 'J.R.R. Tolkien', 352, true);
const returnOfKing = new Book ('Return of the king', 'J.R.R. Tolkien', 416, true);

//render(myLibrary);