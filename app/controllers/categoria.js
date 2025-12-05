const Categoria = require('../../models/categoria');

async function indexCategoria(req, res) {
    try {
        const categoria = await Categoria.find();
        res.status(200).json(categoria)
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function showCategoria(req, res) {
    const id = req.params.id;
    try {
        const categoria = await Categoria.findById(id);
        if(!categoria){
            return res.status(404).json({message: 'Categoria no encontrada'})
        }
        res.status(200).json(categoria)
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function getProductosByCategoria(req, res) {
    const id = req.params.id;
    try {
        const productos = await Producto.find({categoria: id}).populate('categoria').populate('sensor');
        if(!productos){
            return res.status(404).json({message: 'Productos no encontrados'})
        }
        res.status(200).json(productos)
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function postCategoria(req, res) {
    const body = req.body;
    try {
        const categoria = await Categoria.create(body)
        res.status(200).json(categoria)
    } catch (error) {
        res.status(400).json({message: 'Error al crear categoria', data: error})
    }
}

async function updateCategoria(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, body, { new: true});
        if(!categoria) {
            return res.status(404).json({message: 'Categoria no encontrada'});
        }
        res.status(200).json({message: 'Categoria actualizada', data: categoria});
    } catch (error) {
        res.status(400).json({message: 'Erro en la consulta', data: error})
    }
}

async function destroyCategoria(req, res) {
    const id = req.params.id;   
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, { estatus: 'Inactivo'}, {new: true});
        if(!categoria){
            return res.status(404).json({message: 'Categoria no encontrada'})
        }
        res.status(200).json({message: 'Categoria inactiva', data: categoria})
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

module.exports = {
    indexCategoria,
    showCategoria,
    postCategoria,
    updateCategoria,
    destroyCategoria,
    getProductosByCategoria
}