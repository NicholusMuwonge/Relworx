import dotenv from "dotenv";
import models from "../models/index";
import bookValidation from "../validation/book";

const { Book, user: User } = models;

dotenv.config();

/**
 * @param {class} --Book controller
 */
class BookController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} this will return created book
   */
  async create(req, res) {
    // @initial book
    const newBook = {
      title: req.body.title,
      image: req.body.image===""?"https://picsum.photos/200/300":req.body.image,
      author: req.body.author,
      isbn: req.body.isbn,
      createdby: req.user.id,
    };
    const { errors, isValid } = bookValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const isbn = await Book.findOne({ where: { isbn: req.body.isbn } });
    if (isbn) {
      return res
        .status(409)
        .json({ status: 409, error: "isbn already exists." });
    }
    // @save book
    Book.create(newBook)
      .then(async (book) => {
        res
          .status(201)
          .json({ status: 201, message: "Book created successfully", book });
      })
      .catch((error) =>
        res
          .status(500)
          .json({ error: `something wrong please try again. ${error}` })
      );
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  get all created books
   * @returns {Object} return all created books
   */
  getBook(req, res) {
    Book.findAndCountAll({
      where: { createdby: req.user.id }, // all books by a user
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "email", "id"],
        },
      ],
    })
      .then((books) =>
        res.status(200).json({
          status: 200,
          books: books,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  updated books
   * @returns {Object} return updated book
   */
  async updateBook(req, res) {
    // @updating Books
    Book.update(
      {
        title: req.body.title,
        image: req.body.image,
        author: req.body.author,
        isbn: req.body.isbn,
        createdby: req.user.id,
      },
      {
        where: {
          id: req.params.bookId,
        },
        returning: true,
      }
    )
      .then(async (book) => {
        res.status(200).json({
          status: 200,
          message: "book updated successfully.",
          book: book[1],
        });
      })
      .catch((error) =>
        res.status(500).json({
          error: `Something wrong please try again later.${error}`,
        })
      );
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res  delete book
   * @returns {Object} return message and status
   */
  async deleteBook(req, res) {
    Book.destroy({
      where: {
        id: req.params.bookId,
      },
    })
      .then(() =>
        res.status(200).json({
          status: 200,
          message: "book deleted successfully.",
        })
      )
      .catch((error) =>
        res.status(500).json({
          error: `Something wrong please try again later. ${error}`,
        })
      );
  }

  /**
   * Get a single book
   * @param {Object} req - Request from user
   * @param {Object} res - view single book
   * @returns {Object} return book
   */
  async getSingleBook(req, res) {
    const user = req.user.id;
    const { bookId } = req.params;
    await Book.findByPk(bookId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "email", "id"],
        },
      ],
    })
      .then((book) =>
        res.status(200).json({
          status: 200,
          book,
        })
      )
      .catch((error) =>
        res.status(500).json({
          error: `Something wrong please try again later. ${error}`,
        })
      );
  }
}

export default BookController;
