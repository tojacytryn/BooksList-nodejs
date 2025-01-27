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

addEventListener("DOMContentLoaded", async (event) => {
    let books = await getBooks()
    console.log(books);
    books.forEach(book => {
        let tr = document.createElement("tr")
        table.appendChild(tr)
        console.log(book);
        let td = document.createElement("td")
        td.textContent = book.id
        tr.appendChild(td)
        td = document.createElement("td")
        td.textContent = book.title
        tr.appendChild(td)
        td = document.createElement("td")
        td.textContent = book.author
        tr.appendChild(td)
    });
});

let addBookButton = document.querySelector("#add-book")

addBookButton.addEventListener("click", async () => {
    console.log("click");
    let bookTitle = document.querySelector("#book-title").value
    let bookAuthor = document.querySelector("#book-author").value
    await addBook(bookTitle, bookAuthor);
    location.reload()
})