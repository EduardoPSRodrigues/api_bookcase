import NaoEncontrado from "../error/NaoEncontrado.js";
import { Autor } from "../models/index.js";

class AutorController {
  // Listar todos os autores
  static async listarAutores(req, res) {
    try {
      const autores = await Autor.find();
      res.status(200).json(autores);
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - Erro ao buscar os autores.` });
    }
  }

  // Listar um autor por ID
  static async listarAutorPorId(req, res, next) {
    try {
      const autorEncontrado = await Autor.findById(req.params.id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não encontrado.")); // Passa o erro 404 para o middleware de tratamento de erros
      }
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }

  // Criar um novo autor
  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await Autor.create(req.body);
      res
        .status(201)
        .json({ message: "Autor criado com sucesso.", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar um autor existente
  static async atualizarAutor(req, res, next) {
    try {
      const autorAtualizado = await Autor.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!autorAtualizado)
        return res.status(404).json({ error: "Autor não encontrado." });
      res.status(200).json({ message: "Autor atualizado com sucesso." });
    } catch (error) {
      next(new NaoEncontrado("Id do Autor não encontrado.")); // Passa o erro 404 para o middleware de tratamento de erros
    }
  }

  // Deletar um autor
  static async deletarAutor(req, res, next) {
    try {
      const autorDeletado = await Autor.findByIdAndDelete(req.params.id);
      if (!autorDeletado)
        next(new NaoEncontrado("Id do Autor não encontrado.")); // Passa o erro 404 para o middleware de tratamento de erros
      res.status(200).json({ message: "Autor deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;
