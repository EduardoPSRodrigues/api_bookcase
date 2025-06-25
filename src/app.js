import express from 'express';

const app = express();
app.use(express.json()); // Middleware para converter/parsear a string em JSON

const livros = [
  { id: 1, titulo: 'O Senhor dos Anéis' },
  { id: 2, titulo: 'Harry Potter e a Pedra Filosofal' },
  { id: 3, titulo: 'O Hobbit' }
];

app.get('/', (req, res) => {
  res.status(200).send('Curso de Express.js Funcionando');
});

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const livro = livros.find(l => l.id === id);

  if (livro) {
    res.status(200).json(livro);
  } else {
    res.status(404).send('Livro não encontrado');
  }

});

app.post('/livros', (req, res) => {
  const novoLivro = {
    id: livros.length + 1,
    titulo: req.body.titulo
  };

  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const livro = livros.find(l => l.id === id);

  if (livro) {
    livro.titulo = req.body.titulo;
    res.status(200).json(livro);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

export default app;