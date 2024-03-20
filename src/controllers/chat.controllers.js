import Controllers from "./class.controller.js";
import ChatService from "../services/chat.services.js";
const chatService = new ChatService();

export default class hatController extends Controllers {
  constructor() {
    super(chatService);
  }
}