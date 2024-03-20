import Services from "./class.services.js";
import ChatMongoDao from "../persistence/daos/mongoDB/chat/chat.dao.js";
const chatDao = new ChatMongoDao();

export default class ChatService extends Services {
  constructor() {
    super(chatDao);
  }
}