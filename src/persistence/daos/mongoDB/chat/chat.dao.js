import MongoDao from "../mongo.dao.js";
import { ChatModel } from "./chat.model.js";

export default class ChatMongoDao extends MongoDao {
    constructor() {
        super(ChatModel)
    }
};