import models from "../models/index";

const Book = models.Book;

/* @middleware which find if a book is exist and
check if user is allowed to update or delete a book
*/
export const checkingBook = async (req, res, next) => {
  try {
    const findBook = await Book.findByPk(req.params.bookId);
    if (!findBook) {
      return res
        .status(404)
        .json({ error: "sorry the requested book could not be found." });
    }
    // @check if book publisher is the same as the user
    if (findBook.createdby !== req.user.id) {
      return res.status(403).json({
        error: "permission denied, you are not allowed to perform this action.",
      });
    }
    req.findBook = findBook;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something wrong please try again later." });
  }
};
/* @middleware which find if a book exists
 */
export const findOutIfBookExists = async (req, res, next) => {
  try {
    const findBook = await Book.findByPk(req.params.bookId);
    if (!findBook) {
      return res
        .status(404)
        .json({ error: "sorry the requested book could not be found." });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something wrong please try again later." });
  }
};
