const Producto = require('../../models/producto');


async function indexProducto(req, res) {
    try {
        const producto = await Producto.find().populate('sensor');
        res.status(200).json({message: 'Productos encontrado', data: producto})
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function showProducto(req, res) {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id).populate('sensor');
        if(!producto){
            return res.status(404).json({message: 'Productos no encontrado'})
        }
        res.status(200).json({message: 'Producto encontrado', data: producto})
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function postProducto(req, res) {
    const body = req.body;
    try {
        const producto = await Producto.create(body)
        res.status(200).json({message: 'Producto creado', data: producto})
    } catch (error) {
        res.status(400).json({message: 'Error al crear producto', data: error})
    }
}

async function updateProducto(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        const producto = await Producto.findByIdAndUpdate(id, body, { new: true});
        if(!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.status(200).json({message: 'Producto actualizado', data: producto});
    } catch (error) {
        res.status(400).json({message: 'Erro en la consulta', data: error})
    }
}

async function destroyProducto(req, res) {
    const id = req.params.id;
    try {
        const producto = await Producto.findByIdAndUpdate(id, { estatus: 'Inactivo'}, {new: true});
        if(!producto){
            return res.status(404).json({message: 'Producto no encontrado'})
        }
        res.status(200).json({message: 'Producto inactivo', data: producto})
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

module.exports = { indexProducto, showProducto, postProducto, updateProducto, destroyProducto }
