var express = require('express');
var router = express.Router();

const api = require ('../api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/resultados', async (req, res) =>{
  //conseguir lo que el usuario tipeo en el campo "titulo"
  console.log(req.query);
  const { titulo } = req.query;

  // enviar titulos a la llamada de la API
  const results = await api.searchByTitle(titulo);
  res.send(results);
});

/* GET nosotros page */
router.get('/nosotros', (req, res) => {
  res.render('pages/nosotros', { title: 'Nosotros' });
});

/* GET contacto page */
router.get('/contacto', (req, res) => {
  res.render('pages/contacto', { title: 'Contacto' });
});

router.get ('/libros', async (req, res) => {
  const books = await api.getBooks();
  res.render('pages/libros', {books});
});

router.get('/libro/:id', async (req, res) => {
  //console.log('la ruta trajo '+ req.params.id)
  const book = await api.getBookById(req.params.id);
  res.render ('pages/libro', {book});
});

module.exports = router;