const Producto = require('../../models/producto');


async function indexProducto(req, res) {
    try {
        const producto = await Producto.find().populate('categoria').populate('sensor');
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function showProducto(req, res) {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id).populate('categoria').populate('sensor');
        if(!producto){
            return res.status(404).json({message: 'Productos no encontrado'})
        }
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function getProductosPorCategoria(req, res) {
    const categoriaId = req.params.id;
    try {
        const productos = await Producto.find({ categoria: categoriaId })
            .populate('categoria')
            .populate('sensor'); // si quieres incluir sensores
        res.status(200).json(productos); // Devuelve un array de productos
    } catch (error) {
        res.status(400).json({ message: 'Error en la consulta', data: error });
    }
}

async function postProducto(req, res) {
    const body = req.body;

    // Revisar si 'caracteristicas' viene como string y parsearlo
    if (body.caracteristicas && typeof body.caracteristicas === 'string') {
        try {
            body.caracteristicas = JSON.parse(body.caracteristicas);
        } catch (error) {
            return res.status(400).json({
                message: 'Error en el formato de caracteristicas',
                data: error
            });
        }
    }

    // Agregar imagen si viene del upload
    if (req.file) {
        body.imagen = [req.file.filename];    
    }

    // Validar que todos los campos requeridos estén presentes
    const { peso, color, descripcion, tipo } = body.caracteristicas || {};
    if (!peso || !color || !descripcion || !tipo) {
        return res.status(400).json({
            message: 'Faltan campos requeridos en caracteristicas',
            data: body.caracteristicas
        });
    }

    try {
        const producto = await Producto.create(body);
        res.status(200).json({ message: 'Producto creado', data: producto });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear producto', data: error });
    }
}


async function updateProducto(req, res) {
    const id = req.params.id;
    const body = req.body;
    if(req.file){
        body.imagen = [req.file.filename];    
    }
    try {
        const producto = await Producto.findByIdAndUpdate(id, body, { new: true});
        if(!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.status(200).json({message: 'Producto actualizado', data: producto});
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function getProductoPorPrecioMayor(req, res) {
    try {
        const productos = await Producto.find().sort({ precio: -1 });
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json(producto);
    }
}


async function getProductoPorPrecioMenor(req, res) {
    try {
        const productos = await Producto.find().sort({ precio: 1 });
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ message: 'Error en la consulta', data: error });
    }
}

async function destroyProducto(req, res) {
    const id = req.params.id;
    try {
        const producto = await Producto.findByIdAndUpdate(id, { estatus: 'Inactivo'}, {new: true});
        if(!producto){
            return res.status(404).json({message: 'Producto no encontrado'})
        }
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

module.exports = { indexProducto, showProducto, postProducto, updateProducto, destroyProducto, getProductosPorCategoria, getProductoPorPrecioMayor, getProductoPorPrecioMenor }
