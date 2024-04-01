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
      const userExist = await this.model.getByEmail(email); 
      // console.log('dao', userExist);
      if(userExist){
        const passValid = isValidPassword(userExist, password)
        if(!passValid) return false
        else return userExist
      } return false
    } catch (error) {
      console.log('❌ Error del "login" en user.dao.js => ', error)
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

    async updateConnection(userId) {
    try {
      const currentDate = new Date();
      await this.model.findByIdAndUpdate(userId, { lastConnection: currentDate });
    } catch (error) {
      console.log('❌ Error del "updateCopnnection" en user.dao.js => ', error)
      throw new Error(error.message);
    };
  };

  async deleteInactives() {
    try {
      const inactiveUsers = await this.model.find({ lastConnection: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } });
      await this.model.deleteMany({ _id: { $in: inactiveUsers.map(user => user._id) } });
      return inactiveUsers;

    } catch (error) {
      console.log('❌ Error del "deleteInactives" en user.dao.js => ', error)
      throw new Error(error.message);
    };
  };

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
