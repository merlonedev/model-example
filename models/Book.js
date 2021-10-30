const connection = require('./connection');

function serialize(bookData) {
  return {
    id: bookData.id,
    authorId: bookData.author_id,
    title: bookData.title,
  }
}

async function getAll() {
  const [books] = await connection.execute(
    'SELECT author_id, title FROM model_example.books;'
  );
  return books.map(serialize);
}

async function findById(id) {
  const query = 'SELECT * FROM model_example.books WHERE id = ?';

  const [bookData] = await connection.execute(query, [id]);

  if (!bookData.length) {
    return null;
  }

  return serialize(bookData[0]);
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