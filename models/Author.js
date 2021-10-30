// models/Author.js

const connection = require('./connection');

// Cria uma string com o nome completo do autor

const getNewAuthor = (authorData) => {
  const { id, firstName, middleName, lastName } = authorData;

  const fullName = [firstName, middleName, lastName]
    .filter((name) => name)
    .join(' ');

  return {
    id,
    firstName,
    middleName,
    lastName,
    name: fullName,
  };
};

// Converte o nome dos campos de snake_case para camelCase

const serialize = (authorData) => ({
  id: authorData.id,
  firstName: authorData.first_name,
  middleName: authorData.middle_name,
  lastName: authorData.last_name
});

// Busca todos os autores do banco.
const getAll = async () => {
  return connection()
      .then((db) => db.collection('authors').find().toArray())
          .then((authors) =>
              authors.map(({ _id, firstName, middleName, lastName }) =>
              getNewAuthor({
                  id: _id,
                  firstName,
                  middleName,
                  lastName,
              })
          )
      );
}

const findById = async (id) => {
  const query = 'SELECT id, first_name, middle_name, last_name FROM model_example.authors WHERE id = ?'

  const [authorData] = await connection.execute(query, [id]);

  if (!authorData.length) {
    return null;
  }

  const { firstName, middleName, lastName } = serialize(authorData[0]);

  return getNewAuthor({
    id, firstName, middleName, lastName
  });
}

const validAuthor = (authorData) => {
  const { firstName, middleName, lastName, nationality } = authorData;
  
  if (!firstName || typeof firstName !== String) return false;
  if (typeof middleName !== String) return false;
  if (!lastName || typeof lastName !== String) return false;
  if (typeof nationality !== String) return false;

  return true;
}

const addNewAuthor = async (authorData) => {
  const query = 'INSERT INTO model_example.authors (first_name, middle_name, last_name, birthday, nationality) VALUES (?, ?, ?, ?, ?);'
  const { firstName, middleName, lastName, birthday, nationality } = authorData;

  await connection.execute(query, [firstName, middleName, lastName, birthday, nationality]);
}


module.exports = {
  getAll,
  findById,
  validAuthor,
  addNewAuthor,
};
