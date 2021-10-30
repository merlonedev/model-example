// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

const app = express();

app.use(bodyParser.json());
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
