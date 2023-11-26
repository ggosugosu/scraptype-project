const { User } = require('../models');

const userORM = {
  createUser: async ({ kakao_id, name = '', email = '' }) => {
    const exist = await existsUser(kakao_id);

    if (exist) {
      await User.update({ kakao_id, name, email }, { where: { kakao_id } });

      return await User.findOne({ where: { kakao_id } });
    }

    return await User.create({
      kakao_id,
      name,
      email,
      role: 'NORMAL',
    });
  },
};

const existsUser = async (kakao_id) =>
  await User.findOne({ where: { kakao_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

export default userORM;
