const router = require('express').Router();

const apiRouterUser = require ('./api/user');
const apiRouterCategoria = require ('./api/categoria');
const apiRouterArticulo = require ('./api/articulo');

router.use('/usuario', apiRouterUser);
router.use('/categoria', apiRouterCategoria);
router.use('/articulo', apiRouterArticulo);


module.exports=router;