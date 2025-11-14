const expres = require('express');
const router = expres.Router();
const sensorController = require('../app/controllers/sensor');

router.get('/', sensorController.indexSensor);

router.get('/:id', sensorController.showSensor);

router.post('/', sensorController.storeSensor);

router.put('/:id', sensorController.updateSensor);

router.delete('/:id', sensorController.destroySensor);

module.exports = router;