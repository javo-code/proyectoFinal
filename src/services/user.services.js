import Services from "./class.services.js";

import factory from "../persistence/daos/factory.js";
const { userDao } = factory;

import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.winston.js";
import config from "../config/config.js";

import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }
//------------- 📌 GENERAR TOKEN
  #generateToken(user, timeExp) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY_JWT, {
      expiresIn: timeExp,
    });
    return token;
  }

  register = async (user) => {
    try {
      const response = await this.dao.register(user);
      await sendMail(user, "register");
      return response;
    } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

  async login(user) {
    try {
      const userExist = await userDao.login(user);
      if(userExist) return this.#generateToken(userExist);
      else return false;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

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

    async getUserById(id) {
    try {
      const user = await userRepository.getUserById(id);
      if (!user) return false;
      else return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  

}
