import express from "express";
import passport from "passport";
import Book from "../../controllers/Book";
import { checkingBook } from "../../middleware/book";

const book = new Book();

const router = express.Router();
const auth = passport.authenticate("jwt", {
  session: false});

// @Method POST
router.post("/create", auth, book.create);
// @Method GET
// @Desc get all created book
router.get("/", auth, book.getBook);
// @Method GET
// @desc get single book
router.get("/:bookId", auth, checkingBook, book.getSingleBook);
// @Method PUT
// @Desc update books
router.put("/:bookId", auth, checkingBook, book.updateBook);
// @Method Delete
// @desc deleting books
router.delete("/:bookId", auth, checkingBook, book.deleteBook);

export default router;
