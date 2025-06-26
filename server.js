import 'dotenv/config';
import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Jeito alternativo de iniciar o servidor
// import app from './src/app.js'

// const port = process.env.PORT || 3000;


// app.listen(port, () => {
//   console.log(`Servidor escutando em http://localhost:${port}`)
// })