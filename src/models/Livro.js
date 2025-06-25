import mongoose from 'mongoose';

// Schema com propriedades do objeto livro e suas validações

const livroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
        editora: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const livro = mongoose.model('livros', livroSchema);

export default livro;