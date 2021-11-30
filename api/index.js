const { Op } = require("sequelize");
const { contained } = require("sequelize/dist/lib/operators");

// traer la DB
const db = require('../models');

// SELECT * FROM libro
// Esto es una función anónima de tipo arrow function guardada en una variable llamada getBooks... por lo tanto: es una función llamada getBooks
const getBooks = async (id) => {
    // Llamo a la DB
    const books = await db.libro.findAll({
        include:db.autor}).then(result => {
        return result;
    });

    return books;
}
const getBookById = async (id) => { 
    console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*')
    console.log('El Id que llego a /api es' + id)
    console.log('+*+*+*+*+*+*+*+*+*');
   // select * from libro where id_libro = 3
    const book = await db.libro.findByPk(id, {
        include: db.autor
    }).then(result => {
        return result;
    });

    return book;
}
const searchByTitle = async (titulo) => {
    // Op.substring toma una cadena y le agrega %
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

// Exportamos las funciones
module.exports = {
    getBooks,
    getBookById,
    searchByTitle
}
