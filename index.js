// index.js

const express = require('express');

const Author = require('./models/Author');

const Books = require('./models/Book');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
});

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: "Author not found" });

  res.status(200).json(author);
})

app.get('/books', async (_req, res) => {
  const books = await Books.getAll();

  res.status(200).json(books);
});

app.post('/books', async (req, res) => {
  try {
    await Books.addNewBook(req.body);
    res.status(201).json({ message: 'Book added' });
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  const book = await Books.findById(id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  res.status(200).json(book);
});

app.get('/books/author/:id', async (req, res) => {
  const { id } = req.params;

  const books = await Books.findByAuthorId(id);

  if (!books) return res.status(404).json({ message: "No books found" });

  res.status(200).json(books);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
