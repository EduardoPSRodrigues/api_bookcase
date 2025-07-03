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
      enum: {
        values: ["Editora A", "Editora B", "Editora C"],
        message: "A editora {VALUE} não é um valor permitido",
      },
      trim: true,
    },
    preco: {
      type: Number,
      required: [true, "O preço do livro é obrigatório."],
    },
    paginas: {
      type: Number,
      required: [true, "O número de páginas do livro é obrigatório."],
      /* min: [
        10,
        "O número de páginas deve ser pelo menos 10. Valor fornecido: {VALUE}",
      ],
      max: [
        5000,
        "O número de páginas não pode exceder 5.000. Valor fornecido: {VALUE}",
      ],

      Validação personalizada utilizando Javascript para o número de páginas
      Pode ser usado o min e max, mas aqui optei usar uma validação personalizada */
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: (props) =>
          `O número de páginas deve estar entre 10 e 5000. Valor fornecido: ${props.value}`,
      },
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
