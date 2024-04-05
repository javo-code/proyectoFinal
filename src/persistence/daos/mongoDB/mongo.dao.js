//mongo.dao.js:
export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const response = await this.model.find({});
      //console.log("clg desde el dao =>", response)
      return response;
    } catch (error) {
      console.log('❌ Error del "getAll" en user.mongo.dao.js => ', error);
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try{
      const response = await this.model.findById(id);
      return response;
    }catch(error){
      console.log('❌ Error del "getById" en user.mongo.dao.js => ', error);
      throw new Error(error.message)
    };
  };
  async create(obj) {
    try {
      const response = await this.model.create(obj);
      return response;
    } catch (error) {
      console.log('❌ Error del "create" en user.mongo.dao.js => ', error);
      throw new Error(error.message);
    }
  }

  async update(id, obj) {
    try {
      const itemUpdated = await this.model.updateOne({ _id: id }, obj);
      return itemUpdated;
    } catch (error) {
      console.log('❌ Error del "update" en user.mongo.dao.js => ', error);
      throw new Error(error.message);
    }
  }

  async delete(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log('❌ Error del "delete" en user.mongo.dao.js => ', error);
      throw new Error(error.message);
    }
  }
}
