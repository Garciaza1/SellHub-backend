const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    quantidade: { type: Number, required: true },
    descricao: { type: String, required: true },
    dataVenda: { type: Date },
    dataInsert: { type: Date },
    statusVenda: {Type: String, required: true},
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  clientesReservados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }],
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
