import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const cartCollectionName = "carts";

export const cartSchema = new Schema({
    products: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: "products" // Referencia al modelo de productos
        },
        quantity: {
          type: Number,
          default: 1 
        },
      }
    ]
});
  
  cartSchema.plugin(mongoosePaginate);

export const CartModel = model(cartCollectionName, cartSchema);
