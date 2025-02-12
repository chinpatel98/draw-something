const R = require('ramda');
const User = require('./user');

class Users {

  constructor() {
    this.users = {};
    this.drawerIndex = 0;
  }

  addUser(socketId) {
    this.users[socketId] = new User(socketId);
  };

  removeUser(socketId) {
    this.users[socketId].deleteUser();
    delete this.users[socketId];
  };

  find(socketId) {
    return this.users[socketId];
  };

  nextDrawers() {
    let list = this.getUserList();
    let drawer1 = list[this.drawerIndex];
    this.drawerIndex += 1;
    if (this.drawerIndex === list.length) this.drawerIndex = 0;
    let drawer2 = list[this.drawerIndex];
    this.drawerIndex += 1;
    if (this.drawerIndex === list.length) this.drawerIndex = 0;
    return {"drawer1": drawer1, "drawer2": drawer2};
  };

  getUserList() {
    return R.values(this.users);
  };

  allReady() {
    let userArray = this.getUserList();
    let isReady = R.propEq('isReady', true);
    return R.all(isReady)(userArray);
  };

  unReadyAll() {
    Object.keys(this.users).forEach(id => this.users[id].isReady = false);
  };
}

let users;
exports.Users = Users;
exports.UsersInstance = (function () {
  return function () {
    if (!users) users = new Users();
    return users;
  }
})();