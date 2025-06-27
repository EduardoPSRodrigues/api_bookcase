import express from 'express';
import conectarBancoDeDados from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await conectarBancoDeDados(); // Conectar ao banco de dados MongoDB Atlas

conexao.on('error', (error) => {
  console.error('Erro de conexão:', error);
});

conexao.once('open', () => {
  console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
});

const app = express();
routes(app); // Configurar as rotas

export default app;
