import Controllers from "./class.controller.js";

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

import UserDao from "../persistence/daos/mongoDB/users/user.dao.js";
const userDao = new UserDao();


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
        next(error);
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
        next(error);
    }
  };
  
  register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const exist = await userDao.getByEmail(email);
    if (exist) return res.status(400).json({ msg: "User already exists" });
    const user = { first_name, last_name, email, age, password };
    const newUser = await userDao.register(user);
    return httpResponse.Ok(res, "Register OK", newUser);
  } catch (error) {
    next(error);
  }
};

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);
      if (!token) createResponse(res, 404, "Error login");
      else {
        res.header("Authorization", token);
        createResponse(res, 200, token);
      }
    } catch (error) {
      next(error);
    }
  };

  profile = (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
        first_name,
        last_name,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  };
}
