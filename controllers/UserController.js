const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenServices = require ('../services/token')

exports.login = async (req, res, next) => {
    try {
      const user = await models.Usuario.findOne({
        where: { email: req.body.email },
      });
      if (user) {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwordIsValid) {
          const token = await tokenServices.encode(user);
  
          res.status(200).send({ auth: true, tokenReturn: token
               //user: user 
              });
        } else {
          res.status(401).json({
            error: "Error en usuario o contraseña",
          });
        }
      } else {
        res.status(404).json({
          error: "Error en usuario o contraseña",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error!!",
      });
      next(error);
    }    
};

exports.add = async(req, res, next) => {
  try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.Usuario.create(req.body);
      res.status(200).json(reg);
  } catch (e) {
      res.status(500).send({
          message: 'Ocurrió un error'
      });
      next(e);
  }
};
exports.list= async(req, res, next) => {
  try {
      let valor = req.query.valor;
      const reg = await models.Usuario.findAll();
      res.status(200).json(reg);
  } catch (e) {
      res.status(500).send({
          message: 'Ocurrió un error'
      });
      next(e);
  }
};
exports.activate= async(req, res, next) => {
  try {
      const reg = await models.Usuario.update({ estado: 1 }, { where: { id: req.body.id } });
      res.status(200).json(reg);
  } catch (e) {
      res.status(500).send({
          message: 'Ocurrió un error'
      });
      next(e);
  }
};
exports.deactivate= async(req, res, next) => {
  try {
      const reg = await models.Usuario.update({ estado: 0 }, { where: { id: req.body.id } });
      res.status(200).json(reg);
  } catch (e) {
      res.status(500).send({
          message: 'Ocurrió un error'
      });
      next(e);
  }
};
exports.update= async(req, res, next) => {
  try {
      let pas = req.body.password;
      const reg0 = await models.Usuario.findOne({ where: { id: req.body.id } });
      if (pas != reg0.password) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.Usuario.update({ rol: req.body.rol, nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, num_documento: req.body.num_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password }, { where: { id: req.body.id } });
      res.status(200).json(reg);
  } catch (e) {
      res.status(500).send({
          message: 'Ocurrió un error'
      });
      next(e);
  }
}