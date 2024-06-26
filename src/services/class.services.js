//class.services.js:
export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return this.dao.getAll();
    } catch (error) {
      console.log('❌ Error del "getAll" en user.service.dao.js => ', error);
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log('❌ Error del "getById" en user.service.dao.js => ', error);
      throw new Error(error.message);
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      if (!newItem) return false;
      else return newItem;
    } catch (error) {
      console.log('❌ Error del "create" en user.service.dao.js => ', error);
      throw new Error(error.message);
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return await this.dao.update(id, obj);
    } catch (error) {
      console.log('❌ Error del "update" en user.service.dao.js => ', error);
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      console.log('❌ Error del "delete" en user.service.dao.js => ', error);
      throw new Error(error.message);
    }
  };
}
