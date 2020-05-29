import express from "express";
import passport from "passport";
import passportJwt from "./middleware/passport-jwt";
import router from "./routes/index";

const app = express();
const port = process.env.PORT || 5000; // local port or heroku port if hosted
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// passport
app.use(passport.initialize());
passportJwt(passport);

// @router configuration
app.use(router);

// @router configuration
app.use((res) => {
  return res.status(404).json({
    status: 404,
    error: "resource not found",
  });
});
app.listen(port, () => {
  console.log(`Server started successfully on ${port}`);
});

export default app;
