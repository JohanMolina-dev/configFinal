const tokenService = require("../services/token");
module.exports = {
  verificarAdministrador: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == "Administrador") {
      next();
    } else {
      return res.status(403).send({
        message: "No autorizado",
      });
    }
  },
  verificarAlmacenero: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == "Administrador" || response.rol == "Almacenero") {
      next();
    } else {
      return res.status(403).send({
        message: "No autorizado",
      });
    }
  },
};

//(response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero')
