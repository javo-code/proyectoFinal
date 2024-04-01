import factory from '../daos/factory.js';
const { userDao } = factory;

import UserResDTO from '../dtos/usersDTO/user.res.dto.js';

export default class UserRepository {
  constructor() {
    this.dao = userDao;
  }

  async getUserById(id) {
    try {
      const user = await this.dao.getById(id);
      return new UserResDTO(user);
    } catch (error) {
      console.log('❌ Error del "getUserById" en user.repository.js => ', error)

      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.dao.getAll();
      console.log("🚀clg linea 22 desde user.repository =>", users);
      return users.map(user => new UserResDTO(user));
    } catch (error) {
      console.log('❌ Error del "getAllUsers" en user.repository.js => ', error)

      throw new Error(error.message);
    }
  }
}