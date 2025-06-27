import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Curso de Express.js');
  });

  // Middleware para converter/parsear a string em JSON
  // e permitir o envio de dados no corpo da requisição
  app.use(
    express.json(),
    livros,
    autores
  );
};

export default routes;