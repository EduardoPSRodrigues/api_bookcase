import livro from '../models/Livro.js';
import express from 'express';

class LivroController {
    // Listar todos os livros
    static async listarLivros(req, res) {
        try {
            const livros = await livro.find();
            res.status(200).json(livros);
        } catch (e) {
            res.status(500).json({ message: `${e.message} - Erro ao buscar os livros.` });
        }
    }

    // Listar um livro por ID
    static async listarLivroPorId(req, res) {
        try {
            const livroEncontrado = await livro.findById(req.params.id);
            if (!livroEncontrado) return res.status(404).json({ error: 'Livro não encontrado.' });
            res.status(200).json(livroEncontrado);
        } catch (e) {
            res.status(500).json({ message: `${e.message} - Erro ao buscar o livro.` });
        }
    }

    // Criar um novo livro
    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: 'Livro criado com sucesso.', livro: novoLivro });
        } catch (e) {
            res.status(500).json({ message: `${e.message} - Erro ao cadastrar um livro.` });
        }
    }

    // Atualizar um livro existente
    static async atualizarLivro(req, res) {
        try {
            const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body);
            if (!livroAtualizado) return res.status(404).json({ error: 'Livro não encontrado.' });
            res.status(200).json({ message: 'Livro atualizado com sucesso.'});
        } catch (e) {
            res.status(500).json({ message: `${e.message} - Erro ao atualizar o livro.` });
        }
    }

    // Deletar um livro
    static async deletarLivro(req, res) {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id);
            if (!livroDeletado) return res.status(404).json({ error: 'Livro não encontrado.' });
            res.status(200).json({ message: 'Livro deletado com sucesso.' });
        } catch (e) {
            res.status(500).json({ message: `${e.message} - Erro no servidor ao deletar o livro.` });
        }
    }
}

export default LivroController;