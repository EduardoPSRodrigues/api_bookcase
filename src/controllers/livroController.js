import livro from '../models/Livro.js';
import express from 'express';

class LivroController {
    // Listar todos os livros
    static async listarLivros(req, res) {
        try {
            const livros = await livro.find();
            res.status(200).json(livros);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar livros.' });
        }
    }

    // Buscar um livro por ID
    static async buscarLivroPorId(req, res) {
        try {
            const livroEncontrado = await livro.findById(req.params.id);
            if (!livroEncontrado) return res.status(404).json({ error: 'Livro não encontrado.' });
            res.status(200).json(livroEncontrado);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar livro.' });
        }
    }

    // Criar um novo livro
    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: 'Livro criado com sucesso.', livro: novoLivro });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - Erro ao cadastrar um livro.` });
        }
    }

    // Atualizar um livro existente
    static async atualizarLivro(req, res) {
        try {
            const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!livroAtualizado) return res.status(404).json({ error: 'Livro não encontrado.' });
            res.json(livroAtualizado);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - Erro ao atualizar livro.` });
        }
    }

    // Deletar um livro
    static async deletarLivro(req, res) {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id);
            if (!livroDeletado) return res.status(404).json({ error: 'Livro não encontrado.' });
            res.json({ message: 'Livro deletado com sucesso.' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao deletar livro.' });
        }
    }
}

export default LivroController;