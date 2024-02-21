const mongoose = require('mongoose');

const dbConfig = {
  uri: 'mongodb+srv://garciazaum:UCj0G3OGJpeuS6pr@cluster0.9vzes1e.mongodb.net/SellHub?retryWrites=true&w=majority'
};

mongoose.connect(dbConfig.uri)

  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = mongoose;