const Client = require('../Models/Client');
const jwt = require('jsonwebtoken');


const secretKey = 'client';

function gerarToken(client) {
    return jwt.sign({ clientId: client._id, email: client.email }, secretKey, { expiresIn: '100h' });
}


module.exports = {

    // Login do perfil
    async login(req, res) {
      
      const { email, senha } = req.body;
      
      try {
        const client = await Client.findOne({ email: email});
        
        // Verificar a senha (isso deve ser feito de maneira mais segura em produção)
        if(!client){
          return res.status(401).json({ error: `erro ao enviar os dados` });
        } 
  
        if (clientntntntntnt.senha !== senha) {
          return res.status(401).json({ error: `Senha inválida ${client.senha}` });
        }
        
  
        // Gerar um token JWT após a autenticação bem-sucedida
        const token = gerarToken(client);   
  
        console.log("Usuario se conectou");
        return res.json({ message: 'Login bem-sucedido' , token, client});
  
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    },
  
    // Pega o perfil
    async find(req, res) {
  
      const { email } = req.params;
  
      try {
  
        const findclient = await Client.findOne({ email: email });
  
        if (!findclient) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
  
  
        return res.json(findclient);
  
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    },
  
  
    // read all 
    async readAll(req, res) {
  
      try {
  
        const listAllclients = await Client.find();
  
        if (!listAllclients) {
          return res.status(404).json({ error: 'não exitem usuarios na tabela' });
        }
  
        return res.json(listAllclients);
  
      } catch (error) {
  
        console.log(`erro ao tentar buscar os dados ${error}`);
        return res.status(500).json({ error: 'erro interno do servidor' });
      }
  
    },
  
    async read(req, res) {
  
      const { id } = req.params;
  
      try {
        const listclient = await Client.findOne({ _id: id });
  
        if (!listclient) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
  
        return res.json(listclient);
  
      } catch (error) {
  
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
  
      }
    },
  
  
    // Cria perfil novo
    async create(req, res) {
  
      const { nome, email, senha, phone, cpf, nasc } = req.body;
  
      try {
  
        if (!nome || !senha || !email || !phone || !cpf || !nasc ) {
          return res.status(400).json({ error: 'É necessário preencher todo o formulario' });
        }
  
        const addclient = await Client.create({
          nome,
          email,
          senha,
          phone, 
          cpf, 
          nasc
        });
        
  
        console.log(addclient);
        return res.json({ message: `Foram inseridos os dados: ${addclient}` });
  
      } catch (error) {
  
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
  
      }
    },
  
  
    async update(req, res) {
  
      const { id } = req.params;
  
      const { nome, email, senha, phone, cpf, nasc } = req.body;
  
      try {
        const clientResult = await Client.updateOne({ _id: id }, { $set: { nome, email, senha, phone, cpf, nasc } });
  
        console.log(`atualizado para: ${nome, email, senha, phone, cpf, nasc}`);
        return res.json({ nome, email, senha, phone, cpf, nasc });
  
      } catch (error) {
  
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
  
    },
  
  
  
    // Hard delete do perfil
    async delete(req, res) {
  
      const { id } = req.params;
  
      try {
        const clientDelete = await Client.findOneAndDelete({ _id: id });
  
        if (clientDelete) {
          return res.json({ clientDelete });
        }
  
        return res.status(404).json({ error: 'Não foi encontrado o registro para deletar.' });
  
      } catch (error) {
  
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
  
      }
    },
  
  
  };
  