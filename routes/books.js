const express = require('express');
const router = express.Router();

const Books = require('../models/Books');
const Author = require('../models/Author');

router.get('/', async (_req, res) => {
  const books = await Books.getAll();

  return res.status(200).json(books);
});

router.post('/', async (req, res) => {
  const authors = await Author.getAll();
  const { authorId } = req.body;
  // const validAuthor = authors.find((a) => a._id === parseInt(authorId, 10));
  try {
    // if (!validAuthor) {
      // return res.status(400).json({ message: "Author not found." });
    // } else {
      await Books.addNewBook(req.body);
      return res.status(201).json({ message: 'Book added' });
    // }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const book = await Books.findById(id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  return res.status(200).json(book);
});

router.get('/author/:id', async (req, res) => {
  const { id } = req.params;

  const books = await Books.findByAuthorId(id);

  if (!books || books.length === 0) return res.status(404).json({ message: "No books found" });

  return res.status(200).json(books);
});

module.exports = router;
