const router = require("express").Router();
const userController = require("../../controllers/UserController");
const auth = require('../../middlewares/auth.js');

router.get("/list",userController.list);
router.post("/add",userController.add);
router.put("/update",userController.update);
router.put("/activate",userController.activate);
router.put("/deactivate",userController.deactivate);
router.post("/login", userController.login);

module.exports = router;
