const jwt = require("jsonwebtoken");
const models = require("../models");



async function checkToken(token) {
    let localID = null;
    try {
        const { id } = await jwt.decode(token);
        localID = id;
    } catch (e) {
        return false;
    }
    console.log(localID);
    const user = await models.Usuario.findOne({ where: { id: localID } });
    if (user) {
        const token = jwt.sign({ id: localID }, 'secretKeyToGenerateToken', { expiresIn: '1d' });
        return { token, rol: user.rol };
    } else {
        return false;
    }
}
module.exports = {
  encode: async (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol,
        status: user.estado,
      },
      "config.secret",
      {
        expiresIn: 86400, //24 horas
      }
    );
    return token;
  },
  decode: async (token) => {
    try {
      const { id } = await jwt.verify(token, "config.secret");
      const user = await models.user.findOne({
        where: {
          id: id,
          estado: 1,
        }
      });
      if (user) {
          return user;
          
      }else{
          return false;

      }
    } catch (error) {
        const newToken = await checkToken(token);
        return newToken
    }
  }
};
