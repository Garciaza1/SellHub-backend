// models/User.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    phone: { type: String, required: true },
    cpf: { type: String, required: true },
    nasc: { type: String, required: true },
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

