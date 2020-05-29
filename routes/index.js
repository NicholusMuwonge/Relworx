import express from "express";

import users from "./api/user";
import books from "./api/book";

// @api
// @ initialize app
const app = express();
// @router configuration
app.use("/api/users", users);
app.use("/api/books", books);

export default app;
