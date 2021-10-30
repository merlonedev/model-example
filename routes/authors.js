const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

router.get('/', async (_req, res) => {
  const authors = await Author.getAll();

  return res.status(200).json(authors);
});

router.post('/', async (req, res) => {
  const authors = await Author.getAll();
  const { firstName, lastName } = req.body;
  const authorExists = authors.find((a) => a.firstName === firstName || a.lastName === lastName);

  if (authorExists) {
    return res.status(400).json({ message: "Author already exists" });
  }

  if (!Author.validAuthor) {
    return res.status(500).json({ message: "Invalid author" });
  } else {
    try {
      await Author.addNewAuthor(req.body);
      return res.status(201).json({ message: "Author added" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: "Author not found" });

  return res.status(200).json(author);
});

module.exports = router;


