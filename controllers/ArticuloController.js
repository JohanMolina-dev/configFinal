const models = require("../models");

exports.list = async (req, res, next) => {
  try {
    const register = await models.Articulo.findAll({
        include:[
            {
                model: models.Categoria,
                as: 'categoria',
                //attributes:["id", "nombre", "descripcion"]
            },
            
            
        ]
    });
    if (register) {
      res.status(200).json(register);
    } else {
      res.status(404).send({
        message: "No hay Articulos registrados",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error",
    });
    next(error);
  }
};
exports.listBta = async (req, res, next) => {
  try {
    const register = await models.Articulo.findAll({
        where: { estado : 1}
            
            
      
    });
    if (register) {
      res.status(200).json(register);
    } else {
      res.status(404).send({
        message: "No hay Articulos registrados",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error",
    });
    next(error);
  }
};
exports.listTena = async (req, res, next) => {
  try {
    const register = await models.Articulo.findAll({
        where:{ estado : 0},
        include:[
          {
              model: models.Categoria,
              as: 'categoria',
              //attributes:["id", "nombre", "descripcion"]
          },
        ]
            
            
      
    });
    if (register) {
      res.status(200).json(register);
    } else {
      res.status(404).send({
        message: "No hay Articulos registrados",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error",
    });
    next(error);
  }
};

exports.add = async (req, res, next) => {
  try {
    const registro = await models.Articulo.create(req.body);
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).send({
      message: "No se logro crear la Articulo",
    });
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const register = await models.Articulo.update(
      {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        categoriaID: req.body.categoriaID,
       
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).json(register);
  } catch (error) {
    res.status(500).send({
      message: "Error",
    });
    next(error);
  }
};
exports.activate = async (req, res, next) => {
  try {
    const register = await models.Articulo.update(
      { estado: 1 },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).json(register);
  } catch (error) {
    res.status(500).send({
      message: "Error",
    });
    next(error);
  }
};
exports.deactivate = async (req, res, next) => {
  try {
    const register = await models.Articulo.update(
      { estado: 0 },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).json(register);
  } catch (error) {
    res.status(500).send({
      message: "Error",
    });
    next(error);
  }
};
