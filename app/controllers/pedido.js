const Pedido = require('../../models/pedido');

async function indexPedido(req, res) {
    try {
        const userId = req.userId;
        console.log('userId en indexPedido:', userId); // <- agrega esto para debug
        const pedidos = await Pedido.find({ usuario: userId })
                                    .populate('producto')
                                    .populate('usuario')
                                    .lean();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al consultar pedidos:', error);
        res.status(400).json({ message: 'Error en la consulta', data: error });
    }
}


async function showPedido(req, res) {
    const id = req.params.id;
    const userId = req.userId;
    try {
        const pedido = await Pedido.findOne({ _id: id, usuario: userId}).populate('producto').populate('usuario');
        if(!pedido){
            return res.status(404).json({message: 'Pedidos no encontrado'})
        }
        res.status(200).json({message: 'Pedido encontrado', data: pedido})
    }catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function postPedido(req, res) {
    const body = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    try {
        const pedido = await Pedido.create({
            usuario: userId,
            producto: body.producto, // ya son IDs, no hacer map
            cantidad: body.cantidad,  // envía la cantidad desde Angular
            total: body.total,
            estado: body.estado,
            pago: body.pago
        });

        res.status(200).json({ message: 'Pedido creado', data: pedido });
    } catch (error) {
        console.error('Error al crear pedido:', error);
        res.status(400).json({ message: 'Error al crear pedido', data: error });
    }
}

async function updatePedido(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        const pedido = await Pedido.findByIdAndUpdate(id, body, { new: true});
        if(!pedido) {
            return res.status(404).json({message: 'Pedido no encontrado'});
        }
        res.status(200).json({message: 'Pedido actualizado', data: pedido})
    } catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

async function destroyPedido(req, res) {
    const id = req.params.id;
    try {
        const pedido = await Pedido.findByIdAndUpdate(id, { estado: 'cancelado'}, { new: true});
        if(!pedido) {
            return res.status(404).json({message: 'Pedido no encontrado'});
        }
        res.status(200).json({message: 'Pedido actualizado', data: pedido})
    }catch (error) {
        res.status(400).json({message: 'Error en la consulta', data: error})
    }
}

module.exports = { indexPedido, showPedido, postPedido, updatePedido, destroyPedido }
