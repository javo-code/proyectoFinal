import MongoStore from "connect-mongo";
import session from "express-session";

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL_LOCAL,
/*         crypto: {
            secret:config.SECRET_COOKIES
        } */
    }),
    secret: process.env.SECRET_COOKIES,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 120000,
    },

}