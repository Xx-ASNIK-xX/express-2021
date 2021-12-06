const { Op } = require("sequelize");

// traer la DB
const db = require('../models');

// SELECT * FROM libro
// Esto es una función anónima de tipo arrow function guardada en una variable llamada getBooks... por lo tanto: es una función llamada getBooks
const getBooks = async () => {
    // Llamo a la DB
    const books = await db.libro.findAll({
        include: db.autor
    }).then(result => {
        return result;
    });

    return books;
}

const getAuthors = async () => {
    // SELECT * FROM autor
    const authors = await db.autor.findAll().then(result => {
        return result;
    });

    return authors;
}

const getBookById = async (id) => {
    console.log('-*-*-*-*-*-*-*-*-*-*');
    console.log('El ID que llegó a /api es ' + id);
    console.log('-*-*-*-*-*-*-*-*-*-*');
    // SELECT * FROM libro WHERE id_libro = 3
    // findByPk = find by primary key
    const book = await db.libro.findByPk(id, {
        include: db.autor
    }).then(result => {
        return result;
    });

    return book;
}

const searchByTitle = async (titulo) => {
    // Op.substring toma una cadena y le agrega %
    // SELECT * FROM libros
    // WHERE columna OPERADOR valor
    const results = await db.libro.findAll({
        where: {
            titulo: {
                [Op.substring]: titulo
            }
        },
        include: db.autor
    }).then(result => {
        return result;
    });

    return results;
}
const addBook = async (titulo, precio, portada, autorId) => {
    // Aca vamos a agregar un libro (datos)
    console.log('llego: ', titulo, precio, portada, autorId);
    
    const newBook = await db.libro.create({
        titulo: titulo,
        precio: precio,
        portada: portada,
        autorIdAutor: autorId
    });
    
    return newBook;
};

// Exportamos las funciones
module.exports = {
    getBooks,
    getAuthors,
    getBookById,
    searchByTitle,
    addBook
}

