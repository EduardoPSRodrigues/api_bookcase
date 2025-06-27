import { Autor } from '../models/Autor.js';

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
  static async listarAutorPorId(req, res) {
    try {
      const autorEncontrado = await Autor.findById(req.params.id);
      if (!autorEncontrado)
        return res.status(404).json({ error: 'Autor não encontrado.' });
      res.status(200).json(autorEncontrado);
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - Erro ao buscar o autor.` });
    }
  }

  // Criar um novo autor
  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await Autor.create(req.body);
      res
        .status(201)
        .json({ message: 'Autor criado com sucesso.', autor: novoAutor });
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - Erro ao cadastrar um autor.` });
    }
  }

  // Atualizar um autor existente
  static async atualizarAutor(req, res) {
    try {
      const autorAtualizado = await Autor.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!autorAtualizado)
        return res.status(404).json({ error: 'Autor não encontrado.' });
      res.status(200).json({ message: 'Autor atualizado com sucesso.' });
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - Erro ao atualizar o autor.` });
    }
  }

  // Deletar um autor
  static async deletarAutor(req, res) {
    try {
      const autorDeletado = await Autor.findByIdAndDelete(req.params.id);
      if (!autorDeletado)
        return res.status(404).json({ error: 'Autor não encontrado.' });
      res.status(200).json({ message: 'Autor deletado com sucesso.' });
    } catch (e) {
      res.status(500).json({
        message: `${e.message} - Erro no servidor ao deletar o autor.`,
      });
    }
  }
}

export default AutorController;
