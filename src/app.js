import express from "express";
import conectarBancoDeDados from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectarBancoDeDados(); // Conectar ao banco de dados MongoDB Atlas

conexao.on("error", (error) => {
  console.error("Erro de conexão:", error);
});

 conexao.once('open', () => {
   console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
});

const app = express();
routes(app); // Configurar as rotas

// app.get("/livros/:id", async (req, res) => {
//   const id = req.params.id;
//   const livroEncontrado = await livro.findById(id);

//   if (livro) {
//     res.status(200).json(livro);
//   } else {
//     res.status(404).send("Livro não encontrado");
//   }
// });

// app.post("/livros", (req, res) => {
//   const novoLivro = {
//     id: livros.length + 1,
//     titulo: req.body.titulo,
//   };

//   livros.push(novoLivro);
//   res.status(201).json(novoLivro);
// });

// app.put("/livros/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const livro = livros.find((l) => l.id === id);

//   if (livro) {
//     livro.titulo = req.body.titulo;
//     res.status(200).json(livro);
//   } else {
//     res.status(404).send("Livro não encontrado");
//   }
// });

// app.delete("/livros/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const index = livros.findIndex((l) => l.id === id);

//   if (index !== -1) {
//     livros.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send("Livro não encontrado");
//   }
// });

export default app;
