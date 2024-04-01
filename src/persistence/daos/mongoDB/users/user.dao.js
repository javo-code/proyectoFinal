// User.dao.js:
import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { isValidPassword, createHash } from "../../../../utils/utils.js";

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }

    async login(user){
    try {
      const { email, password } = user;
      // console.log(email);
      const userExist = await this.getByEmail(email); 
      // console.log('dao', userExist);
      if(userExist){
        const passValid = isValidPassword(userExist, password)
        if(!passValid) return false
        else return userExist
      } return false
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async register(user) {
    try {
      const { email, password, role } = user; // Añadimos 'role' al destructuring del usuario
      const existUser = await this.model.findOne({ email });
      if (!existUser) {
        let newUser = {
          ...user,
          password: createHash(password),
        };
      if (!role || role.trim() === "") {
        newUser.role = "admin";
        };
        await this.model.create(newUser);
        return newUser;
      } else {
        return false;
      };
    } catch (error) {
      console.log('❌ Error del "register" en user.dao.js => ', error)
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await this.model.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log('❌ Error del "getByEmail" en user.dao.js => ', error)
      throw new Error(error);
    }
  }
}
