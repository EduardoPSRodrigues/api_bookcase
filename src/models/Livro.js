import mongoose from "mongoose";
import { autorSchema } from "./Autor.js"; // Importando o schema de Autor

// Schema com propriedades do objeto livro e suas validações

const livroSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório."],
      trim: true,
    },
    editora: {
      type: String,
      required: [true, "A editora do livro é obrigatória."],
      trim: true,
    },
    preco: {
      type: Number,
      required: [true, "O preço do livro é obrigatório."],
    },
    paginas: {
      type: Number,
      required: [true, "O número de páginas do livro é obrigatório."],
    },
    // Referenciando o schema de Autor com o Mongoose
    autor: {
      type: autorSchema,
      required: [true, "O(a) autor(a) do livro é obrigatório."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;

// Se quiser criar um editoraSchema será da mesma forma que o autorSchema
// e referenciará o schema de Editora no campo editora do livroSchema.
