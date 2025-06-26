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
      required: true,
      trim: true,
    },
    editora: {
      type: String,
      required: true,
      trim: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    paginas: {
      type: Number,
      required: true,
    },
    autor: autorSchema, // Referenciando o schema de Autor com o Mongoose,
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