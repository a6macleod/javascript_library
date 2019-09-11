
let myLibrary = [];
let tempBook, tempTitle, tempAuthor, tempPages, tempRead

const addABook = document.querySelector('.add-book');

function Book (title, author, pages, read=false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
	  let haveRead = read == true ? "have" : "have not"
	  return(`${title} was written by ${author} and is ${pages} long. I ${haveRead} this book.`);
	}
	addBookToLibrary(this);
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

addABook.addEventListener('click', addBookToLibrary);


const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);
const fellowship = new Book ('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true);
const twinTower = new Book ('The Twin Towers', 'J.R.R. Tolkien', 352, true);
const returnOfKing = new Book ('Return of the king', 'J.R.R. Tolkien', 416, true);

//console.log(hobbit); 

console.log(myLibrary);
