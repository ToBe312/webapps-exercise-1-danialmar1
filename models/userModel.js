const fs = require('fs');

const dataPath = 'data/users.json';

let users = [];

const loadUsers = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        users = [];
    }
}

const saveUsers = () => {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

const getAll = () => {
    return users;
}

const findByUsername = (username) => {
    return users.find(u => u.username === username);
}

const findByEmail = (email) => {
    return users.find(u => u.email === email);
}

const create = (user) => {
    users.push(user);
    saveUsers();
    return user;
}

const update = (username, newData) => {
    const user = findByUsername(username);
    if (user) {
        Object.assign(user, newData);
        saveUsers();
        return user;
    }
    return null;
}

const remove = (username) => {
    const index = users.findIndex(u => u.username === username);
    if (index !== -1) {
        const deleted = users.splice(index, 1);
        saveUsers();
        return deleted[0];
    }
    return null;
}




loadUsers();

module.exports = {
  getAll,
  findByUsername,
  findByEmail,
  create,
  update,
  remove
};