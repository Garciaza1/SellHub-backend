const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String },
    preco: { type: Number },
    quantidade: { type: Number },
    descricao: { type: String },
    dataVenda: { type: Date },
    dataInsert: { type: Date },
    statusVenda: { Type: String },
    imagem: { type: String, maxlength: 2000000 },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  clientesReservados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }],
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
