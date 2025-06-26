import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    nacionalidade: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Autor = mongoose.model("Autores", autorSchema);

export { Autor, autorSchema };
