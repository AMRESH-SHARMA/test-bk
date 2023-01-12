import mongoose from "mongoose"
const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
  },
  genre: {
    type: String,
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
  rentPerDay: {
    type: Number,
  },
  // avatar: {
  //   public_id: {
  //     type: String,
  //   },
  //   url: {
  //     type: String,
  //   },
  // },
  approved: {
    type: Boolean,
    default: "false",
  }, uploadedBy: {
    type: String,
  },
}, { timestamps: true });

const BookModel = mongoose.model("Book", bookSchema);
export default BookModel;