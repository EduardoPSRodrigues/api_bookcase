import express from "express";
import conectarBancoDeDados from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectarBancoDeDados(); // Conectar ao banco de dados MongoDB Atlas

conexao.on("error", (error) => {
  console.error("Erro de conexão:", error);
});

conexao.once("open", () => {
  console.log("Conexão com o MongoDB Atlas estabelecida com sucesso!");
});

const app = express();
app.use(express.json()); // Habilitar o uso de JSON no corpo das requisições
routes(app); // Configurar as rotas

// Middleware para tratamento de erros
app.use(manipuladorDeErros);

export default app;
