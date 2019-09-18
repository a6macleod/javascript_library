const myLibrary = [];
let myLibraryIndex = 0;

// Get elements
const submitABook = document.querySelector('#new-book');
const addABookButton = document.querySelector('#add-book');
const cancelNewBook = document.querySelector('#cancel');
// form elements
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formCheckbox = document.querySelector('.have_read');


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
	formCheckbox.checked = false;
}

///////////////// Work on newPages validation to stop Null and string submittals
function validateInput(newTitle, newAuthor, newPages) {
	if (newTitle != '' && newAuthor != '' && newPages != isNaN && newPages != null) {
		console.log(newPages);
		return true
	}
}
/////////////////////////////////////////////////////////////////

function pushToLibrary(book) {
	myLibrary.push(book);
	render(book);
}

function haveReadBook (addBook) {
	if (addBook.read == true) {
		return `<span class="yes-read" data-index="${addBook.index}">Read</span>`;
	} else {
		return `<span data-index="${addBook.index}"><button type="button" class="not-read" data-index=${addBook.index} onclick=yesReadBook(${addBook.index})>Read it?</button></span>`;
	}
}

function yesReadBook(dataIndex) {
	// update book object
	let book = findBookMyLibrary(dataIndex);
	book.read = true;

	// find the button
	let readButton = document.querySelector(`button[data-index="${dataIndex}"]`);
	
	// remove the button
	readButton.remove();

	// insert the "read" and span => haveReadBook()
	let insertRead = document.querySelector(`span[data-index="${dataIndex}"]`);
	insertRead.classList.add("yes-read")
	insertRead.innerHTML = "Read"
}

function findBookMyLibrary (dataIndex) {
	for (obj in myLibrary) {
		book = myLibrary.find(i => i.index == dataIndex);
	}
	return book;
}

function selectList (dataIndex) {
	return document.querySelector(`li[data-index="${dataIndex}"]`);
}

function removeBook (dataIndex) {
	const listToBeDeleted = selectList(dataIndex);
	const buttonToBeDeleted = document.querySelector(`.delete-button[data-index="${dataIndex}"`);
	const bookToBeDeleted = findBookMyLibrary(dataIndex);

	listToBeDeleted.remove();
	buttonToBeDeleted.remove();
	myLibrary.slice(bookToBeDeleted, 1);
}

function deleteButton(addBook) {
	return `<button type="button" class="delete-button" data-index=${addBook.index} onclick=removeBook(${addBook.index})>Remove</button>`;
}

function render(addBook) {
		const bookLi = document.createElement('li');
		const listSpot = document.querySelector('#book-list');
		const checkIfRead = haveReadBook(addBook);
		const removeBookButton = deleteButton(addBook);

		listSpot.appendChild(bookLi);
		bookLi.setAttribute('data-index', `${addBook.index}`);
		bookLi.innerHTML = `<p>${checkIfRead} <span class="book-title">${addBook.title}</span> - Author: ${addBook.author} - Length: ${addBook.pages} pages -- ${removeBookButton}</p>`
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
formCheckbox.addEventListener('click', yesReadBook);



// example books to start with
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, false);
const fellowship = new Book ('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true);
const twinTower = new Book ('The Twin Towers', 'J.R.R. Tolkien', 352, false);
const returnOfKing = new Book ('Return of the king', 'J.R.R. Tolkien', 416, true);
