//user.controllers.js:
import Controllers from "./class.controller.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken"

import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
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
  
  async register(req, res, next){
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

  async login(req, res, next){
    try {
      const { email, password } = req.body;
      const token = await userService.login({ email, password });
      if (token) {
        const userData = await userService.getByEmail(email);
        return res.status(200).json({ token, userData });
      } else {
        return httpResponse.NotFound(res, "Error login");
      }
    } catch (error) {
      console.log('❌ Error del "login" en user.controller.js => ', error);
      next(error.message);
    }
  };

  async profile(req, res, next) {
    try {
      const user = req.user;
      const token = jwt.sign({ userId: user._id }, config.SECRET_KEY_JWT, { expiresIn: '2m' });
      return res.status(200).json({ user, token });
    } catch (error) {
      console.log('❌ Error del "profile" en user.controller.js => ', error);
      next(error.message);
    };
  };
  
  async infoSession(req, res){
  res.send({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
    userData: req.session.userData
  });
  };
  
  async logout(req, res){
  req.session.destroy((err) => {
    if (!err) res.send("Logout ok!");
    else res.send({ status: "Logout ERROR", body: err });
  });
};
  
  async deleteInactives(req, res, next) {
    try {
      const deletedUsers = await userService.deleteInactives();
      if (!deletedUsers) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM);
      } else {
        return httpResponse.Ok(res, deletedUsers);
      }
    } catch (error) {
      console.log('❌ Error del "deleteInactives" en user.controller.js => ', error)
      next(error);
    };
  };

}
