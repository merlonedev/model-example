const connection = require('./connection');

const { ObjectId } = require('mongodb');

const serialize = (bookData) => ({
  id: bookData._id,
  title: bookData.title,
  authorId: bookData.author_id
});

async function getAll() {
  return connection()
    .then((db) => db.collection('books').find().toArray()
      .then((books) => books.map(serialize)));
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const bookData = await connection()
    .then((db) => db.collection('books').findOne(new ObjectId(id)));

  if (!bookData) return null;

  return bookData;
}

// async function findByAuthorId(authorId) {
//   const books = await connection()
//     .then((db) => db.collection('books')
//       .find({}, { id: authorId }));

//   if (!books) return null;

//   return books;
// }

// async function addNewBook(bookData) {
//   const { title, authorId } = bookData;
//   const query = 'INSERT INTO model_example.books (title, author_id) VALUES (?, ?);';

//   connection.execute(query, [title, authorId]);
// }

async function addNewBook({ title, authorId }) {
  return connection()
    .then((db) => db.collection('books').insertOne({ title, authorId }))
}

module.exports = {
  getAll,
  findById,
  // findByAuthorId,
  addNewBook,
}