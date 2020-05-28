import express from "express";

import users from "./api/user";

// @api
// @ initialize app
const app = express();
// @router configuration
app.use("/api/users", users);

export default app;
