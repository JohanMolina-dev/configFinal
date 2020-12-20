const router = require("express").Router();
const userController = require("../../controllers/UserController");
const auth = require('../../middlewares/auth.js');

router.get("/list", auth.verificarAdministrador, userController.list);
router.post("/add", auth.verificarAdministrador, userController.add);
router.put("/update", auth.verificarAdministrador, userController.update);
router.put("/activate", auth.verificarAdministrador, userController.activate);
router.put("/deactivate", auth.verificarAdministrador, userController.deactivate);
router.post("/login", userController.login);

module.exports = router;
