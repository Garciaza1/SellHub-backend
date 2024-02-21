// models/Client.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true },
  nasc: { type: Date, required: true },
  produtosReservados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }],
  produtosComprados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }]

});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
