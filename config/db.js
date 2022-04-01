const options = require("./option");
const mysql = require("serverless-mysql");

const dbData = {
  host: options.storageConfig.host,
  user: options.storageConfig.user,
  password: options.storageConfig.password,
  database: options.storageConfig.database,
};

// const db = mysql.createPool({
//   host: dbData.host,
//   user: dbData.user,
//   password: dbData.password,
//   database: dbData.database,
// });

const db = mysql({
  config: {
    host: dbData.host,
    database: dbData.database,
    user: dbData.user,
    password: dbData.password,
  },
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
