import express from "express";
import passport from "passport";

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

// @router configuration
app.use((res) => {
  res.status(404).send({
    status: 404,
    error: "resource not found",
  });
});
app.listen(port, () => {
  console.log(`Server started successfully on ${port}`);
});

export default app;
