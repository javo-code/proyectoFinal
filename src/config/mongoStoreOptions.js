//mongoStoreOptions.js:
import MongoStore from "connect-mongo";

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL_ATLAS,
        /*  crypto: {
            secret:config.SECRET_COOKIES
        } */
    }),
    secret: process.env.SECRET_COOKIES,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    },
}