import mongoose from "mongoose";

// Middleware para validação global
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor.trim() !== "",
  message: (props) => `O campo ${props.path} não pode ser vazio.`,
});