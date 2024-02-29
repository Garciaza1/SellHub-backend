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
            return res.json({ message: 'foram inseridos os dados:', addProduct });
        }
        catch (err) {
            console.log("erro ao criar produto", err);
            return res.json({ error: 'Erro interno do servidor', err });
        }

    },

    async readAll(req, res) {

        try {
            const allProducts = await Products.find();

            if (!allProducts) {
                return res.json({ message: "Não existem Produtos" });
            }

            return res.json(allProducts);

        } catch (error) {
            console.log(`erro ao tentar buscar os dados ${error}`);
            return res.status(500).json({ error: 'erro interno do servidor' });
        }
    },

    async read(req, res) {

        const { id } = req.params;

        try {
            const product = await Products.findOne({ _id: id });

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            return res.json(product);

        } catch (error) {

            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async readName(req, res) {

        const { nome } = req.body;

        try {
            const products = await Products.find({ nome: nome });

            if (!products) {
                return res.json({ message: 'Nenhum produto encontrado com esse nome' });
            }

            return res.json(products);

        } catch (error) {

            console.error('Erro ao buscar Produtos:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    // Hard delete do produto
    async delete(req, res) {

        const { id } = req.params;

        try {
            const deleteProduct = await Products.findOneAndDelete({ _id: id });

            if (deleteProduct) {
                return res.json({ deleteProduct });
            }

            return res.status(404).json({ error: 'Não foi encontrado o registro para deletar.' });

        } catch (error) {

            console.error('Erro ao deletar usuário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    // vai ter PUT ate que a porra aqui e no client também 

}