const { Auth } = require('../models');

const authORM = {
  existAuth: async ({ token }) => {
    return existsAuthById({ token });
  },
};

const existsAuthById = async ({ token }) =>
  await Auth.findOne({ where: { token } })
    .then((data) => data !== undefined)
    .then((existsData) => existsData);

export default authORM;
