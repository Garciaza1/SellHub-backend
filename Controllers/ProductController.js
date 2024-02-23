const Products = require('../Models/Products');

module.exports = {

    async create(req, res) {

        const { nome, preco, quantidade, descricao, usuario, imagem } = req.body

        try {

            if (!nome || !preco || !quantidade || !descricao || !imagem || !usuario) {
                return res.status(400).json({ error: "è necessario preencher todos os dados!!" });
            }

            const addProduct = await Products.create({
                nome,
                preco,
                quantidade,
                descricao,
                dataIsert: new Date(),
                statusVenda: "false",
                usuario,
                imagem
            });
            console.log(addProduct);
            return res.json({message: 'foram inseridos os dados:', addProduct});
        }
        catch(err){
            console.log("erro ao criar produto", err);
            return res.json({error: 'Erro interno do servidor', err});
        }

    }

}