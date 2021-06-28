async function users(id) {
  try {
    return await global.client.users.fetch(id);
  } catch (error) {
    return undefined;
  }
};

global.client.users.getUser = users;
global.client.getUser = users;

module.exports = {
  users
}