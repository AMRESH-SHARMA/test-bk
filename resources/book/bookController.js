import Book from "./BookModel.js"
import User from "../user/userModel.js"
import mongoose from "mongoose"
import { sendResponse } from "../../util/sendResponse.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    sendResponse(200, true, books, res)
  } catch (e) {
    console.log(e);
    sendResponse(400, false, e.message, res)
  }
};

export const getSingleBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return sendResponse(400, false, `Book does not exist with Id: ${req.params.id}`, res)
    }
    sendResponse(200, true, book, res)
  } catch (e) {
    console.log(e);
    sendResponse(400, false, e.message, res)
  }
};

export const addBook = async (req, res, next) => {
  try {
    const { bookName, genre, language, description, rentPerDay, uploadedBy } = req.body;
    console.log(req.files)
    const book = await Book.create({
      bookName,
      genre,
      language,
      description,
      rentPerDay,
      uploadedBy
    })

    const user = await User.findByIdAndUpdate(uploadedBy,
      {
        $push: {
          booksAdded: {
            bookId: book._id,
          }
        }
      })
    sendResponse(201, true, user, res)
  } catch (e) {
    console.log(e);
    sendResponse(400, false, e.message, res)
  }
};


export const updateBook = async (req, res, next) => {
  try {
    const { bookName, genre, language, description, rentPerDay } = req.body;

    const newBookData = {
      bookName,
      genre,
      language,
      description,
      rentPerDay,
    };

    await Book.findByIdAndUpdate(req.params.id, newBookData);
    sendResponse(200, true, 'Updated Successfully', res)
  } catch (e) {
    if (e.code) {
      return sendResponse(400, false, `${Object.keys(e.keyValue)} Already in use`, res)
    }
    sendResponse(400, false, e, res)
  }
};

export const updateBookStatus = async (req, res, next) => {
  try {
    const TrueStatus = {
      approved: 'true'
    };
    const FalseStatus = {
      approved: 'false'
    };
    const book = await Book.findById(req.body.id);
    if (book.approved) {
      await Book.updateOne({ _id: mongoose.mongo.ObjectId(req.body.id) }, FalseStatus);
    } else {
      await Book.updateOne({ _id: mongoose.mongo.ObjectId(req.body.id) }, TrueStatus);
    }
    sendResponse(200, true, 'Book Status Updated', res)
  } catch (e) {
    sendResponse(400, false, e.message, res)
  }
};

export const deleteSingleBook = async (req, res, next) => {
  try {
    await Book.deleteOne(req.body.bookId)
    await User.findByIdAndUpdate(req.body.uploadedBy,
      {
        $pull: {
          booksAdded: {
            bookId: req.body.bookId,
          }
        }
      })
    sendResponse(201, true, 'Book deleted', res)
  } catch (e) {
    sendResponse(400, false, e.message, res)
  }
}