import Validator from "validator";
import isEmpty from "is-empty";
import isbnValidator from "isbn-validate";
import isImageUrl from "is-image-url";

const validateBooksInput = (data) => {
  let errors = {};

  //  convert null for empty field to empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.isbn = !isEmpty(data.isbn) ? data.isbn : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.image = !isEmpty(data.image) ? data.image : "";

  // Name checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (!Validator.isLength(data.title, { min: 3, max: 30 })) {
    errors.title = "Title must have at least 3 characters";
  }
  // ISBN checks
  if (Validator.isEmpty(data.isbn)) {
    errors.isbn = "ISBN field is required";
  } else if (13<(data.isbn.length)>20) {
    errors.isbn = "ISBN is invalid";
  }
  // Author checks
  if (Validator.isEmpty(data.author)) {
    errors.author = "Author field is required";
  }
  const regForUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  //   Url Checks
  if (!(data.image).match(regForUrl)) {
    errors.image = "Image link is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors), //if errors is empty, then its valid so its set to true
  };
};

export default validateBooksInput;
