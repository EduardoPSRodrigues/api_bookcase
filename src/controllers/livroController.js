import NaoEncontrado from "../error/NaoEncontrado.js";
import { Autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController {
  // Listar todos os livros
  static async listarLivros(req, res, next) {
    try {
      const livros = await livro.find();
      res.status(200).json(livros);
    } catch (error) {
      next(error);
    }
  }

  // Listar um livro por ID
  static async listarLivroPorId(req, res, next) {
    try {
      const livroEncontrado = await livro.findById(req.params.id);
      if (!livroEncontrado)
        return next(new NaoEncontrado("Id do livro não localizado.")); // Passa o erro 404 para o middleware de tratamento de erros
      res.status(200).json(livroEncontrado);
    } catch (error) {
      next(error);
    }
  }

  // Criar um novo livro
  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;

    // Verifica se o autor foi enviado no corpo da requisição
    // if (!novoLivro.autor) {
    //     return res.status(400).json({ error: 'Autor não informado.' });
    // }

    try {
      const autorEncontrado = await Autor.findById(novoLivro.autor);

      const livroCompleto = { ...novoLivro, autor: autorEncontrado }; // Não é necessário usar _doc aqui, pois o Mongoose já retorna o objeto do autor
      // const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc} }; // Usando _doc para obter o objeto do autor

      const livroCriado = await livro.create(livroCompleto);

      res
        .status(201)
        .json({ message: "Livro criado com sucesso.", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar um livro existente
  static async atualizarLivro(req, res, next) {
    try {
      const livroAtualizado = await livro.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!livroAtualizado)
        return next(new NaoEncontrado("Id do livro não localizado.")); // Passa o erro 404 para o middleware de tratamento de erros
      res.status(200).json({ message: "Livro atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  // Deletar um livro
  static async deletarLivro(req, res, next) {
    try {
      const livroDeletado = await livro.findByIdAndDelete(req.params.id);
      if (!livroDeletado)
        return next(new NaoEncontrado("Id do livro não localizado.")); // Passa o erro 404 para o middleware de tratamento de erros
      res.status(200).json({ message: "Livro deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  // Listar livros por editora
  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora; // Usando query string para buscar por editora ?query=nomeDaEditora

    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;
