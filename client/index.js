const table = document.querySelector("table");

async function getBooks() {
    const url = "http://localhost:3000/books";
    let json;
    try {
        const response = await fetch(url);
        json = await response.json();
    } catch (error) {
        console.error(error);
    }
    return json;
}

async function addBook(bookTitle, bookAuthor) {
    const url = `http://localhost:3000/add-book/${bookTitle}/${bookAuthor}`;
    let json;
    try {
        const response = await fetch(url);
        await getBooks();
        json = await response.text();
    } catch (error) {
        console.error(error);
    }
    return json;
}

async function removeBook(bookId) {
    const url = `http://localhost:3000/remove-book/${bookId}`;
    let json;
    try {
        const response = await fetch(url);
        await getBooks();
        json = await response.text();
    } catch (error) {
        console.error(error);
    }
    return json;
}

async function updateBook(bookId, bookTitle, bookAuthor) {
    const url = `http://localhost:3000/update-book/${bookId}/${bookTitle}/${bookAuthor}`;
    let json;
    try {
        const response = await fetch(url);
        await getBooks();
        json = await response.text();
    } catch (error) {
        console.error(error);
    }
    return json;
}

function removeButtonsFunctionality(removeButtons) {
    removeButtons.forEach(button => {
        button.addEventListener("click", async () => {
            console.log("click");
            let bookId = button.value
            await removeBook(bookId);
            location.reload()
        })
    });
}

addEventListener("DOMContentLoaded", async (event) => {
    let books = await getBooks()
    console.log(books);
    books.forEach(book => {
        let tr = document.createElement("tr")
        table.appendChild(tr)
        console.log(book);
        let td = document.createElement("td")
        td.textContent = book.id
        tr.appendChild(td);
        td = document.createElement("td")
        td.textContent = book.title
        td.contentEditable = true;
        tr.appendChild(td)
        td.addEventListener("blur", function () {
            let id = this.parentElement.children[0].textContent
            let title = this.parentElement.children[1].textContent
            let author = this.parentElement.children[2].textContent
            console.log(id, title, author);
            updateBook(id, title, author)
        });
        td = document.createElement("td")
        td.textContent = book.author
        td.contentEditable = true;
        tr.appendChild(td)
        td.addEventListener("blur", function () {
            let id = this.parentElement.children[0].textContent
            let title = this.parentElement.children[1].textContent
            let author = this.parentElement.children[2].textContent
            console.log(id, title, author);
            updateBook(id, title, author)
        });
        td = document.createElement("td")
        tr.appendChild(td)
        removeButton = document.createElement("button")
        removeButton.id = "removeButton"
        removeButton.textContent = "Usuń";
        removeButton.value = book.id
        td.appendChild(removeButton);
    });
    let removeButtons = document.querySelectorAll("button#removeButton")
    removeButtonsFunctionality(removeButtons)
});

let addBookButton = document.querySelector("#add-book")

addBookButton.addEventListener("click", async () => {
    console.log("click");
    let bookTitle = document.querySelector("#book-title").value
    let bookAuthor = document.querySelector("#book-author").value
    await addBook(bookTitle, bookAuthor);
    location.reload()
})