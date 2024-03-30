import config from "../config/config.js";
import jwt from "jsonwebtoken";
import Services from "./class.services.js";

import factory from "../persistence/daos/factory.js";
const { userDao } = factory;

import { logger } from "../utils/logger.winston.js";

import UserRepository from "../persistence/repository/user.repository.js";
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
      logger.info(user);
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
      console.log(error);
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
}
