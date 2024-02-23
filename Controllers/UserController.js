const User = require('../Models/User');
const jwt = require('jsonwebtoken');


const secretKey = 'user';

function gerarToken(user) {
    return jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '100h' });
}


module.exports = {

    // Login do perfil
    async login(req, res) {
      
      const { email, senha } = req.body;
      
      try {
        const user = await User.findOne({ email: email});
        
        // Verificar a senha (isso deve ser feito de maneira mais segura em produção)
        if(!user){
          return res.status(401).json({ error: `erro ao enviar os dados` });
        } 
  
        if (user.senha !== senha) {
          return res.status(401).json({ error: `Senha inválida ${user.senha}` });
        }
        
  
        // Gerar um token JWT após a autenticação bem-sucedida
        const token = gerarToken(user);   
  
        console.log("Usuario se conectou");
        return res.json({ message: 'Login bem-sucedido' , token, user});
  
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    },
  
    // Pega o perfil
    async find(req, res) {
  
      const { email } = req.params;
  
      try {
  
        const findUser = await User.findOne({ email: email });
  
        if (!findUser) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
  
  
        return res.json(findUser);
  
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
    },
  
  
    // read all 
    async readAll(req, res) {
  
      try {
  
        const listAllUsers = await User.find();
  
        if (!listAllUsers) {
          return res.status(404).json({ error: 'não exitem usuarios na tabela' });
        }
  
        return res.json(listAllUsers);
  
      } catch (error) {
  
        console.log(`erro ao tentar buscar os dados ${error}`);
        return res.status(500).json({ error: 'erro interno do servidor' });
      }
  
    },
  
    async read(req, res) {
  
      const { id } = req.params;
  
      try {
        const listUser = await User.findOne({ _id: id });
  
        if (!listUser) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
  
        return res.json(listUser);
  
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
  
        const addUser = await User.create({
          nome,
          email,
          senha,
          phone, 
          cpf, 
          nasc
        });
        
  
        console.log(addUser);
        return res.json({ message: `Foram inseridos os dados: ${addUser}` });
  
      } catch (error) {
  
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
  
      }
    },
  
  
    async update(req, res) {
  
      const { id } = req.params;
  
      const { nome, email, senha, phone, cpf, nasc } = req.body;
  
      const newUser = {nome, email, senha, phone, cpf, nasc}

      try {
        const userResult = await User.updateOne({ _id: id }, { $set: newUser });
        
        const user = await User.findOne({ _id: id });
        
        console.log(`atualizado para: ${ user  }`);
        console.log(`LOG: ${ userResult }`);
        return res.json({user});
  
      } catch (error) {
  
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
  
    },
  
  
  
    // Hard delete do perfil
    async delete(req, res) {
  
      const { id } = req.params;
  
      try {
        const userDelete = await User.findOneAndDelete({ _id: id });
  
        if (userDelete) {
          return res.json({ userDelete });
        }
  
        return res.status(404).json({ error: 'Não foi encontrado o registro para deletar.' });
  
      } catch (error) {
  
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
  
      }
    },
  
  
  };
  