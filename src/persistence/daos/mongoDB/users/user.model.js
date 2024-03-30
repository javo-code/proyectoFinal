import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const userCollection = "users";

export const usersSchema = new Schema({
  first_name: { type: String, required: true, index: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: { type: String, require: true, default: "admin"}
});

usersSchema.plugin(mongoosePaginate);

export const UserModel = model(userCollection, usersSchema);