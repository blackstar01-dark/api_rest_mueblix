const express = require('express');
const router = express.Router();
const categoriaController = require('../app/controllers/categoria');

router.get('/', categoriaController.indexCategoria);

router.get('/:id', categoriaController.showCategoria);

router.post('/', categoriaController.postCategoria);

router.put('/:id', categoriaController.updateCategoria);

router.delete('/:id', categoriaController.destroyCategoria);

router.get('/:id/productos', categoriaController.getProductosByCategoria);

module.exports = router;
