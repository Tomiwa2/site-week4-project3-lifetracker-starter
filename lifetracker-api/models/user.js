"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
// const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static async allNutrition(id) {
    const nutrition = await db.query(
      `SELECT 
      name,
      category, 
      quantity, 
      calories, 
      image_url 
      FROM nutrition 
      WHERE user_id = $1 
      ORDER BY created_at DESC`,
      [id]
    );
    return {nutrition: nutrition.rows}
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {

    const { email, password } = creds;
    const user = await User.fetchUserByEmail(email);
    try{
    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      console.log(isValid)
      if (isValid === true) {
        const {nutrition} = await User.allNutrition(user.id)
        const userInfo = User._createPublicUser(user)
        console.log(userInfo)
        return {userInfo, nutrition};
      }
      
    }
console.log("its coming")
    throw new UnauthorizedError("Invalid username/password");
  }
  catch(error){
    console.error(error)
    return null
  }
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    console.log("runs");
    const { email, username, first_name, last_name, password } = creds;

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `INSERT INTO users (
              email,
              username,
              first_name,
              last_name,
              password
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING first_name,
                      last_name 
                      `,
      [normalizedEmail, username, first_name, last_name, hashedPassword]
    );
    const user = result.rows[0];
    console.log(user);

    return user;
  }

  static async nutrition(creds) {
    console.log("nutrition");
    const { id, name, category, quantity, calories, image_url } = creds;

    const result = await db.query(
      `INSERT INTO nutrition (
              name,
              category,
              quantity,
              calories,
              image_url,
              user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING name,
                      category,
                      calories,
                      quantity,
                      image_url
                      `,
      [name, category, quantity, calories, image_url, id]
    );
    const nutrition = result.rows[0];
    console.log(nutrition);

    return nutrition;
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
                  email,
                  password,
                  first_name,
                  last_name
               FROM users
               WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    return user;
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name,
              last_name,
              username
                       
           FROM users
           WHERE id = $1`,
      [userId]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
