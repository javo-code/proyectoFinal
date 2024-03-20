import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { isValidPassword, createHash } from "../../../../utils/utils.js";

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }
  

  /**
   * Genera el token del usuario
   * @param {*} user
   * @param {*} timeExp
   * @returns token
   */
  generateToken(user, timeExp) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: timeExp,
    });
    return token;
  }

    async login(user){
    try {
      const { email, password } = user;
      //logger.info(email);
      const userExist = await this.getByEmail(email); 
      //logger.info('dao', userExist);
      if(userExist){
        const passValid = isValidPassword(userExist, password)
        if(!passValid) return false
        else return this.generateToken(userExist, "15m");
      } return false
    } catch (error) {
      throw new Error(error)
    }
  }

async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({email});
      if(!existUser){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          const newUser = await this.model.create({
            ...user, 
            password: createHash(password),
            role: 'admin'
          })
          return newUser;
        } else {
          const newUser = await this.model.create({
            ...user, 
            password: createHash(password)})
          return newUser;
        }
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error)
    }
  }

    async getByEmail(email){
    try {
      const userExist = await this.model.findOne({email}); 
      //logger.info(userExist);
      if(userExist){
        return userExist
      } return false
    } catch (error) {
      throw new Error(error)
    }
  }
}