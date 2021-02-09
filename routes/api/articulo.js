const router = require('express').Router();
const articuloController = require ('../../controllers/ArticuloController');
const auth = require('../../middlewares/auth');




router.get('/listBta',  articuloController.listBta);
router.get('/listTena',  articuloController.listTena);
router.get('/list',  articuloController.list);
router.post('/add',   articuloController.add);
router.put('/update',articuloController.update);
router.put('/activate',  articuloController.activate);
router.put('/deactivate',  articuloController.deactivate);




module.exports = router;