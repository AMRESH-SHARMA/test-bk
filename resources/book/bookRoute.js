import { Router } from "express";
const router = Router();

import {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  updateBookStatus,
  deleteSingleBook
} from './bookController.js'

router.route("/book/get-books").get(getAllBooks);

router.route("/book/get-single-book/:id").get(getSingleBook);

router.route("/book/create-book").post(addBook);

router.route("/book/update-book/:id").put(updateBook);

router.route("/book/update-book-status").put(updateBookStatus);

router.route("/book/delete-single-book").delete(deleteSingleBook);

export default router