import factory from '../daos/factory.js';
const { userDao } = factory;

import UserResDTO from '../dtos/usersDTO/user.res.dto.js';

export default class UserRepository {
  constructor() {
      this.dao = userDao
  }
  async getUserById(id) {
    try {
        const user = await this.dao.getById(id);
        return new UserResDTO(user);
    } catch (error) {
        throw new Error(error.message);
    } 
  }

    async getAllUsers(id) {
    try {
        const users = await this.dao.getAll(id);
        return new UserResDTO(users);
    } catch (error) {
        throw new Error(error.message);
    } 
  }
}