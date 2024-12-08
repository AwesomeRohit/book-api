import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,

    },
    author: {
        type: String,
        required: true,
    },
    genere: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


})
const Book = mongoose.model("Book", bookSchema);

export default Book;