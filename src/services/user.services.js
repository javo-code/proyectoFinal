//user.services.js:
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import Services from "./class.services.js";

import factory from "../persistence/daos/factory.js";
const { userDao } = factory;

import { logger } from "../utils/logger.winston.js";

import UserRepository from "../persistence/repository/user.repository.js";
import { isValidPassword } from "../utils/utils.js";
const userRepository = new UserRepository();

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }
//------------- 📌 GENERAR TOKEN

  #generateToken(user) {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
  }

  
  register = async (user) => {
    try {
      const response = await this.dao.register(user);
      return response;
    } catch (error) {
    logger.error('❌ Error del "register" en user.service.js => ', error);
    throw new Error(error);
  }
};

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await userDao.getByEmail(email); // Pasar solo el email como un string
      if (userExist) {
        const isPasswordValid = isValidPassword(userExist, password);
        if (isPasswordValid) {
          const token = this.#generateToken(userExist);
          return token;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      logger.error('❌ Error del "login" en user.service.js => ', error);
      throw new Error(error);
    }
  };

  async getUserByEmail(email){
    try {
      const user = await userDao.getByEmail(email);
      if (!user) return false;
      else return user;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  };
}
