import mongoose from 'mongoose';

async function conectarBancoDeDados() {
  
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
    
  console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
  return mongoose.connection;

}

export default conectarBancoDeDados;