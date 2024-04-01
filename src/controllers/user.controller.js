//user.controllers.js:
import Controllers from "./class.controller.js";

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

import UserService from "../services/user.services.js";
const userService = new UserService();

import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }
  async getUserById (req, res, next){
    try {
        const { id } = req.params;
        const user = await userRepository.getUserById(id);
        if (!user)
            return httpResponse.NotFound(res, "User not found!");
        else
            return httpResponse.Ok(res, user);
    } catch (error) {
      console.log('❌ Error del "getUserById" en user.controller.js => ', error);
        next(error.message);
    }
  };

    async getAllUsers (req, res, next){
    try {
      const users = await userRepository.getAllUsers({});
      console.log("🚨clg desde userController =>", users)
        if (!users)
            return httpResponse.NotFound(res, "User not found!");
        else
            return httpResponse.Ok(res, users);
    } catch (error) {
      console.log('❌ Error del "getAllUsers" en user.controller.js => ', error);
        next(error.message);
    }
  };
  
register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const exist = await userService.getUserByEmail(email);
    if (exist) return res.status(400).json({ msg: "User already exists" });
    const user = { first_name, last_name, email, age, password, role };
    const newUser = await userService.register(user);
    return res.json(newUser);
  } catch (error) {
    console.log('❌ Error del "register" en user.controller.js => ', error);
    next(error.message);
  }
};



  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await userService.login({ email, password });
      if (token) {
        const userData = await userService.getUserByEmail(email);
        return res.status(200).json({ token, userData });
      } else {
        return httpResponse.NotFound(res, "Error login");
      }
    } catch (error) {
      console.log('❌ Error del "login" en user.controller.js => ', error);
      next(error.message);
    }
  };
}
