const connection = require('./connection');

const { ObjectId } = require('mongodb');

function serialize(bookData) {
  return {
    id: bookData.id,
    authorId: bookData.author_id,
    title: bookData.title,
  }
}

async function getAll() {
  return connection()
    .then((db) => db.collection('books').find().toArray());
}

async function findById(id) {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const bookData = await connection()
    .then((db) => db.collection('books').findOne(new ObjectId(id)));

  if (!bookData) return null;

  return bookData;
}

async function findByAuthorId(authorId) {
  const query = 'SELECT * FROM model_example.books WHERE author_id = ?';

  const [booksData] = await connection.execute(query, [authorId]);

  if (!booksData.length) {
    return null;
  }

  return booksData.map(serialize);
}

async function addNewBook(bookData) {
  const { title, authorId } = bookData;
  const query = 'INSERT INTO model_example.books (title, author_id) VALUES (?, ?);';

  connection.execute(query, [title, authorId]);
}

module.exports = {
  getAll,
  findById,
  findByAuthorId,
  addNewBook,
}