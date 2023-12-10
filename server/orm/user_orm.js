const { Auth, User } = require('../models');

const userORM = {
  createUser: async ({
    kakao_id,
    name = '',
    email = '',
    token = '',
    expired_at = '',
  }) => {
    const user_id = await createOrUpdateUser({ kakao_id, name, email }).then(
      (data) => data.id
    );

    return createOrUpdateAuth({
      user_id,
      token,
      expired_at,
    });
  },
};

const createOrUpdateUser = async ({ kakao_id, name, email }) => {
  const existUser = await existsUser(kakao_id);

  if (existUser) {
    await User.update({ name, email }, { where: { kakao_id } });

    return await User.findOne({ where: { kakao_id } });
  }

  return await User.create({
    kakao_id,
    name,
    email,
    role: 'NORMAL',
  });
};

const createOrUpdateAuth = async ({ user_id, token, expired_at }) => {
  const existAuth = await existsAuth(user_id);

  if (existAuth) {
    await Auth.update({ token, expired_at }, { where: { user_id } });

    return await Auth.findOne({ where: { user_id } });
  }

  return await Auth.create({
    user_id,
    token,
    expired_at,
  });
};

const existsUser = async (kakao_id) =>
  await User.findOne({ where: { kakao_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

const existsAuth = async (user_id) =>
  await Auth.findOne({ where: { user_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

export default userORM;
