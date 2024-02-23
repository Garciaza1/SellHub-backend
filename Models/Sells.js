const mongoose = require('mongoose');

const SellSchema = new mongoose.Schema({
    // nome: { type: String, required: true },
    // preco: { type: Number, required: true },
    // quantidade: { type: Number, required: true },
    // descricao: { type: String, required: true },
    // dataVenda: { type: Date },
    // dataInsert: { type: Date },
    // statusVenda: {Type: String, required: true},
    // imagem: {Type: Image, required: false},
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
});

const Sell = mongoose.model('Sell', SellSchema);

module.exports = Sell;