const Products = require('../Models/Products');

module.exports = {

    async create(req, res) {

        // precias ter o id do ususario que colocou o produto a venda (puxar na req.params ou mandar via input hidden)
        const { nome, preco, quantidade, descrição, dataVenda, dataIsert, usuario } = req.body

        try {

            if (!nome || !preco || !quantidade || !descrição || !dataVenda || !dataIsert || !usuario) {
                return res.status(400).json({ error: "è necessario preencher todos os dados!!" });
            }


            const addProduct = await Products.create({
                nome,
                preco,
                quantidade,
                descrição,
                dataVenda,
                dataIsert,
                usuario
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