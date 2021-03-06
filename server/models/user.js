const utils = require('../lib/hashUtils');
const Model = require('./model');
const Sessions = require('./session');

/**
 * Users is a class with methods to interact with the users table, which
 * stores information (id, username, hashed password, salt) about users.
 * @constructor
 * @augments Model
 */
class Users extends Model {
  constructor() {
    super('users');
  }

  /**
   * Compares a password attempt with the previously stored password and salt.
   * @param {string} attempted - The attempted password.
   * @param {string} password - The hashed password from when the user signed up.
   * @param {string} salt - The salt generated when the user signed up.
   * @returns {boolean} A boolean indicating if the attempted password was correct.
   */
  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  }

  /**
   * Creates a new user record with the given username and password.
   * This method creates a salt and hashes the password before storing
   * the username, hashed password, and salt in the database.
   * @param {Object} user - The user object.
   * @param {string} user.username - The user's username.
   * @param {string} user.password - The plaintext password.
   * @returns {Promise<Object>} A promise that is fulfilled with the result of
   * the record creation or rejected with the error that occured.
   */
  create({ username, password }) {
    let salt = utils.createRandom32String();

    let newUser = {
      username,
      salt,
      password: utils.createHash(password, salt)
    };

    return super.create.call(this, newUser);
  }

  /**
   * Attempts to log a user in.
   *
   * @param {Object} user - The user object.
   * @param {string} user.username - The user's username.
   * @param {string} user.password - The plaintext password.
   * @returns {Promise<Object>} A promise that is fulfilled with the result of
   * the login or rejected with the error that occured.
   */

  login({ username, password }) {
    return super.get.call(this, { 'username': username })
      .then(userData => {
        if (userData) {
          return module.exports.compare(password, userData.password, userData.salt);
        } else {
          throw 'USER_NOT_EXIST';
        }
      })
      .then(correctPW => {
        if (correctPW) {
          return ''; //Sessions.foo.create(username); // FIX THIS
        } else {
          throw 'WRONG_PW';
        }
      });
  }

  /**
   *
   * @param {String} username - The username to look up.
   * @returns {Promise<Object>} A promise that is fulfilled with the user's ID
   * or rejected with the error that occured.
   */

  getId(username) {
    return super.get.call(this, { username });
  }

}

module.exports = new Users();
