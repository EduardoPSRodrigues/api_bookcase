import http from 'http';

const PORT = 3000;

const rotas = {
  '/': 'Curso de Express.js',
  '/sobre': 'Sobre nos',
  '/contato': 'Contato'
};

const server = http.createServer((req, res) => {
  const rota = rotas[req.url] || 'Rota não encontrada';
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(rota);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

