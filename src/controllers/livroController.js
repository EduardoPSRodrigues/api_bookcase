import NaoEncontrado from "../error/NaoEncontrado.js";
import RequisicaoIncorreta from "../error/RequisicaoIncorreta.js";
import { Autor, livro } from "../models/index.js";

class LivroController {
  // Listar todos os livros
  static async listarLivros(req, res, next) {
    try {
      let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query; // Desestruturação para pegar parâmetros de consulta, se necessário

      let [campoOrdenacao, ordem] = ordenacao.split(":"); // Divide a string de ordenação em campo e ordem

      limite = parseInt(limite); // Converte o limite para um número inteiro
      pagina = parseInt(pagina); // Converte a página para um número inteiro
      ordem = parseInt(ordem); // Converte a ordem para um número inteiro

      if (limite > 0 && pagina > 0) {
        const livros = await livro
          .find()
          .sort({ [campoOrdenacao]: ordem }) // Ordena os livros pelo título em ordem crescente
          .skip((pagina - 1) * limite) // Pula os livros das páginas anteriores
          .limit(limite) // Limita o número de livros retornados
          .populate("autor") // Popula o campo autor com o nome do autor
          .exec();

        res.status(200).json(livros);
      } else {
        next(new RequisicaoIncorreta());
      }
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

      const livroCompleto = { ...novoLivro, autor: autorEncontrado?._id };

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
  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await livro.find(busca).populate("autor"); // Popula o campo autor com o nome do autor

        res.status(200).json(livrosResultado);
      } else {
        // Se nenhum autor for encontrado, retorna um erro 404
        return next(
          new NaoEncontrado("Nenhum autor encontrado com o nome fornecido.")
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros; // Usando query string para buscar por editora e titulo ?query=nomeDaEditora

  let busca = {};

  // Usando regex para busca parcial e o option "i" para tornar a busca case-insensitive
  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {}; // Inicializa o objeto paginas se houver min ou max
  if (minPaginas) busca.paginas.$gte = minPaginas; // Maior ou igual a minPaginas
  if (maxPaginas) busca.paginas.$lte = maxPaginas; // Menor ou igual a maxPaginas

  if (nomeAutor) {
    const autor = await Autor.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    });

    if (autor !== null) {
      // Se o autor for encontrado, adiciona o ID do autor à busca
      busca.autor = autor._id;
    } else {
      // Se nenhum autor for encontrado, busca impossível
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
