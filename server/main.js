const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "2PROgr2"
});

conn.connect((err) => {
  if (err) {
    console.log("Nie połączono z bazą danych");
    console.log(err);
  } else {
    console.log("Połączono z bazą danych");
  }

})

app.get('/books', (req, res) => {
  conn.query("SELECT * FROM books", (err, data, data_info) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  })
})

app.get('/add-book/:title/:author', (req, res)=>{
  const title = req.params.title
  const author = req.params.author

  let sql = `INSERT INTO books VALUES ("", "${title}", "${author}")`
  conn.query(sql, (err, data, data_info) => {
    if (err) {
      res.send("Nie udało się zapisać danych")
      console.log(err);
    } else {
      res.send("Zapisano dane: ")
    }
  })
})

app.get('/remove-book/:id', (req, res)=>{
  const id = req.params.id

  let sql = `DELETE FROM books WHERE id = ${id}`
  conn.query(sql, (err, data, data_info) => {
    if (err) {
      res.send("Nie udało się usunąć danych")
      console.log(err);
    } else {
      res.send("Usunięto dane: ")
    }
  })
})

app.get('/update-book/:id/:title/:author', (req, res)=>{
  const id = req.params.id
  const title = req.params.title
  const author = req.params.author
  
  let sql = `UPDATE books SET title = "${title}", author = "${author}" WHERE id = ${id}`
  conn.query(sql, (err, data, data_info) => {
    if (err) {
      res.send("Nie udało się zaaktualizować danych")
      console.log(err);
    } else {
      res.send("Zaaktulizowano dane: ")
    }
  })
})

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000')
})