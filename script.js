const booksContainer = document.querySelector("#container");
const form = document.querySelector("#form");
const addButton = document.querySelector("#new-book");
const closeButton = document.querySelector("#close");
const submitButton = document.querySelector("#submit");
const authorData = document.querySelector("#author");
const titleData = document.querySelector("#title");
const pagesData = document.querySelector("#pages");
const enjoyabilityData = document.querySelector("#enjoyability");
const rbs = document.querySelectorAll("input[name='choice']");

let books = [
    { author: "Henry Thoreau", title: "Walden", pages: "290", read: true, enjoyment: "7" },
    { author: "Osamu Dazai", title: "No Longer Human", pages: "300", read: true, enjoyment: "9" },
    { author: "Kurt Vonnegut", title: "Cat's Cradle", pages: "210", read: false, enjoyment: null },
    { author: "Emily Bronte", title: "Wuthering Heights", pages: "310", read: true, enjoyment: "8" },
];

addButton.addEventListener("click", displayForm);
closeButton.addEventListener("click", closeForm);
submitButton.addEventListener("click", () => {
    addToBooks();
    clearForm();
    closeForm();
});

class Book {
    constructor (author, title, pages, read, enjoyment) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.enjoyment = enjoyment;
    } 
}

function getReadingStatus() {
    for (const rb of rbs) {
        if (rb.checked) {
            return rb.value;
        }
    }
}

function addToBooks() {
    let newBook = new Book(authorData.value, titleData.value, pagesData.value, getReadingStatus(), enjoyabilityData.value);
    books.push(newBook);
    updateLocalstorage();
    clearDisplay();
    displayBooks();
}

function displayBooks() {
    //books = JSON.parse(localStorage.getItem("books"));
    for (let i = 0; i < books.length; i++) {
        const bookContainer = document.createElement("div");
        bookContainer.setAttribute("data-number", i);
        bookContainer.style.cssText = "align-items: center; background-color: rgb(214, 236, 160, 0.5); border: 1px solid black; display: flex; height: 120px; justify-content: flex-start; position: relative; width: 750px;";
        let bookList = [];
        for (let key in books[i]) {
            if (books[i][key] === false || books[i][key] === true) {
                books[i][key] =
                    books[i][key] ? "Read" : "Not Read";
            } else if (books[i][key] === null) {
                books[i][key] = "";
            }
            bookList.push(books[i][key]);
        }
        for (let j = 0; j < bookList.length; j++) {
            let descriptionPiece = document.createElement("p");
            descriptionPiece.style.cssText = "font-family: 'Raleway', sans-serif; font-size: 20px; margin: 20px; min-width: 120px;";
            if (bookList[j] === "Read" || bookList[j] === "Not Read") {
                descriptionPiece.addEventListener("click", function () {
                    if (descriptionPiece.textContent === "Read") {
                        descriptionPiece.textContent = "Not Read";
                    } else {
                        descriptionPiece.textContent = "Read";
                    }
                });
                descriptionPiece.addEventListener("mouseenter", () => descriptionPiece.style.cssText = "color: rgba(0, 0, 0, 0.2); font-family: 'Raleway', sans-serif; font-size: 20px; margin: 20px; min-width: 120px;");
                descriptionPiece.addEventListener("mouseleave", () => descriptionPiece.style.cssText = "font-family: 'Raleway', sans-serif; font-size: 20px; margin: 20px; min-width: 120px;");
            }
            descriptionPiece.textContent = bookList[j];
            bookContainer.appendChild(descriptionPiece);
        }
        bookList = [];
        let deleteButton = document.createElement("div");
        deleteButton.style.cssText = "background-color: rgb(220,20,60, 0.7); border-radius: 50%; height: 15px; position: absolute; right: 3px; top: 3px; width: 15px;";
        // deleteButton.setAttribute("data-number", i); 
        deleteButton.addEventListener("mouseenter", () => deleteButton.style.cssText = "background-color: rgb(248, 131, 121); border-radius: 50%; height: 15px; position: absolute; right: 3px; top: 3px; width: 15px;");
        deleteButton.addEventListener("mouseleave", () => deleteButton.style.cssText = "background-color: rgb(220, 20, 60); border-radius: 50%; height: 15px; position: absolute; right: 3px; top: 3px; width: 15px;");
        deleteButton.addEventListener("click", function () {
            books.splice(bookContainer.dataset.number, 1);
            updateLocalstorage();
            clearDisplay();
            displayBooks();
        });
        bookContainer.appendChild(deleteButton);
        booksContainer.appendChild(bookContainer);
    }
}

function clearDisplay() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

function clearForm() {
    authorData.value = null;
    titleData.value = null;
    pagesData.value = null;
    // reset radio 
    enjoyabilityData.value = null;
}

function closeForm() {
    form.style.cssText = "display: none;";
}

function displayForm() {
    form.style.cssText = "display: flex;";
}

/* Check localStorage availability
function checkAvailability(type) {
    var storage; 
    try {
        storage = window[type];
        var x = "__storage_test__"; 
        storage.setItem(x, x);
        storage.removeItem(x); 
        return true; 
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === "QuotaExceededError" ||
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") && 
            (storage && storage.length !== 0); 
    }
}

if (checkAvailability("localStorage")) {
    console.log("YIPEE!");
} else {
    console.log("BOO");
}

*/

function updateLocalstorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

if (localStorage.books === null) {
    updateLocalstorage();
}
displayBooks();



