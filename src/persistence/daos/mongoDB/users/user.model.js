import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const userCollection = "users";

export const usersSchema = new Schema({
  first_name: { type: String, required: true, index: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

usersSchema.plugin(mongoosePaginate);

/* usersSchema.pre("find", function () {
  this.populate("products");
}); */

export const UserModel = model(userCollection, usersSchema);