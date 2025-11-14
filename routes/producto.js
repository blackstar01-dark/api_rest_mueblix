const express = require('express');
const router = express.Router();
const productoController = require('../app/controllers/producto');

router.get('/', productoController.indexProducto);

router.get('/:id', productoController.showProducto);

router.post('/', productoController.postProducto);

router.put('/:id', productoController.updateProducto);

router.delete('/:id', productoController.destroyProducto);

module.exports = router;