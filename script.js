let myLibrary = [
	{title: "The Hobbit", 
		author: "J.R.R. Tolkien", 
		pages: 310, 
		read: false, 
		index: 0},

	{title: "The Fellowship of the Ring", 
		author: "J.R.R. Tolkien", 
		pages: 423, 
		read: true, 
		index: 1},

	{title: "The Twin Towers", 
		author: "J.R.R. Tolkien", 
		pages: 352, 
		read: true, 
		index: 2
		},
		
		{title: "Return of the king", 
			author: "J.R.R. Tolkien", 
			pages: 416, 
			aread: false, 
			index: 3
		}

		];


// Get elements
const submitABook = document.querySelector("#new-book");
const addABookButton = document.querySelector("#add-book");
const cancelNewBook = document.querySelector("#cancel");
const formCheckbox = document.querySelector(".have_read");


class Book {
	// constructor
	constructor(title, author, pages, read = false) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.index = findHighestLibraryIndex() + 1;
	}
}

function findHighestLibraryIndex() {
	let highestIndex = 0;
	
	for (let i = 0; i < myLibrary.length; i++) {
		if (myLibrary[i].index > highestIndex) {
			highestIndex = myLibrary[i].index;
		}
	}
	return highestIndex;
}


// Submit Form
	function addBookToLibrary(event) {
		event.preventDefault();

		const newTitle = this.querySelector("[name=new_title").value;
		const newAuthor = this.querySelector("[name=new_author").value;
		const newPages = parseInt(this.querySelector("[name=new_pages").value);
		const newHaveRead = this.querySelector("[name=checkbox]").checked
			? true
			: false;

		if (validateInput(newTitle, newAuthor) && validatePages(newPages)) {
			const book = new Book(newTitle, newAuthor, newPages, newHaveRead);
			clearForm();
			toggleForm();
		
		myLibrary.push(book);
		render(myLibrary);
		}
	}

	function clearForm() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#pages").value = null;
		document.querySelector(".have_read").checked = false;
	}

	function validateInput(newTitle, newAuthor) {
		return newTitle != "" && newAuthor != ""
			? true
			: alert("Missing information on the form!");
	}
	function validatePages(newPages) {
		return !isNaN(newPages) && newPages != null
			? true
			: alert("Please enter a number for the page field.");
	}

	function toggleForm() {
		const hiddenForm = document.querySelectorAll(".form");
		hiddenForm.forEach(function(element) {
			element.classList.toggle("hide-form");
		});
	}



// Update Existing library
	function changeReadBook(dataIndex) {
		let book = findBookMyLibrary(dataIndex);

		book.read = !book.read;

		let readButton = document.querySelector(
			`.read-button[data-index="${dataIndex}"]`
		);
		readButton.innerHTML = renderReadButtons(book);
	}

	function findBookMyLibrary(dataIndex) {
		let index = 0;
		for (let i = 0; i < myLibrary.length; i++) {
			if (dataIndex == myLibrary[i].index) {
			return index;
			} else {
				index += 1;
			}
		}
		const myLibraryIndex = myLibrary.find(i => i.index == dataIndex);
		console.log(`findBookMyLibrary ${myLibraryIndex.title}`);
		return myLibraryIndex;
	}

	function selectList(dataIndex) {
		return document.querySelector(`li[data-index="${dataIndex}"]`);
	}

	function removeBook(dataIndex) {
		// delete li element
		const listToBeDeleted = selectList(dataIndex);
		listToBeDeleted.remove();
		
		// delete book from myLibrary Array
		const bookToBeDeleted = findBookMyLibrary(dataIndex);
		myLibrary.splice(bookToBeDeleted, 1);
	}


// Render the book list and buttons
	function deleteButton(addBook) {
		return `<button type="button" class="delete-button" data-index=${addBook.index} onclick=removeBook(${addBook.index})>Remove</button>`;
	}

	function renderReadButtons(addBook) {
		if (addBook.read == true) {
			return `<span class="read-button" data-index="${addBook.index}"><button type="button" class="yes-read" data-index=${addBook.index} onclick=changeReadBook(${addBook.index})>Read</button></span>`;
		} else {
			return `<span class="read-button" data-index="${addBook.index}"><button type="button" class="not-read" data-index=${addBook.index} onclick=changeReadBook(${addBook.index})>Read it?</button></span>`;
		}
	}

	function render(addBook) {
		const listSpot = document.querySelector("#book-list");
		
		// clear the existing unordered li elements
		listSpot.innerHTML = null;
		
		// cycle through each book in myLibrary to populate
		for (let i = 0; i < myLibrary.length; i++){
		
			const bookLi = document.createElement("li");
			
			const checkIfRead = renderReadButtons(addBook[i]);
			const removeBookButton = deleteButton(addBook[i]);

			listSpot.appendChild(bookLi);
			bookLi.setAttribute("data-index", `${addBook[i].index}`);
			bookLi.innerHTML = `<p>${checkIfRead} <span class="book-title">${addBook[i].title}</span> - Author: ${addBook[i].author} - Length: ${addBook[i].pages} pages ${removeBookButton}</p>`;
		}
	}



// Add event listeners.
submitABook.addEventListener("submit", addBookToLibrary);
addABookButton.addEventListener("click", toggleForm);
cancelNewBook.addEventListener("click", toggleForm);

render(myLibrary);
