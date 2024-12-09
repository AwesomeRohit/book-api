import Book from "../models/book.model.js"
import { sendEmail } from "../utilities/eamilService.js";
import redis from "../utilities/redis.js";

export const getAllbooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const {title, genere, author} = req.query;
  
  const filter = {};
  if(title) filter.title = {$regex : title, $options : "i"};
  if(author) filter.author = {$regex : author, $options : "i"};
  if(genere) filter.genere = genere;

  const cacheKey = `book:genere=${genere || 'all'}:author=${author || 'all'}:title=${title || 'all'}:page=${page}:limit=${limit}`;

  try {
    const getBook = await redis.get(cacheKey);

    if (getBook) {
      return res.status(200).json(JSON.parse(getBook));
    }
    const books = await Book.find(filter).skip(skip).limit(limit).populate();
    if (!books) {
      return res.status(500).json({
        message: "No Books Found!"
      })
    }

    await redis.set("book", JSON.stringify(books), "EX", 3600);

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching Books ", error.message);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
export const addBook = async (req, res) => {

  try {
    const {title,author,genere, publicationYear} = req.body;

    if (!title || !author || !genere || !publicationYear) {
      return res.status(400).json({
        message: "All fields are Required!"
      });
    }
    const newBook = new Book({
      title,
      author,
      genere,
      publicationYear,

    })
    if (newBook) {
      await newBook.save();
      try {
        const bookKey = `book:${title}`
        await redis.set(bookKey, JSON.stringify({newBook}), "EX", 3600);
        console.log(`Your Book Key is ${bookKey}`)
      } catch (error) {
        console.error("Error saving to cache", error.message);
      }
      const bookKey = `book:${title}`
      await redis.set(bookKey, JSON.stringify({
        newBook
      }), "EX", 3600);

      await sendEmail({
        to : req.user.email,
        subject : "Book Added Succesfully!",
        text : `Hi ${req.user.username} your book has been added succesfully!`,
        html : `<p> Hi ${req.user.username}</p> <p> your book has been added succesfully </p> `
      })
        console.log(req.user.email);
    }
    return res.status(201).json({
      message: "Book added successfully!"
    });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    console.error("error creating book", error.message);
    return res.status(500).json({
      message: "Internal Server Error While Adding Books"
    })

  }
}
export const deleteBook = async (req, res) => {

  const {
    title
  } = req.body;
  try {
    if (!title) return res.status(400).json({
      message: "Title field is required to delete a book!"
    })

    const remove = await Book.findOneAndDelete({
      title
    });
    await redis.del("all_book");

    if (!remove) {
      return res.status(404).json({
        message: `Book with title ${title} not found!`
      })
    }
    return res.status(200).json({
      message: `book with title ${title} succesfully deleted!`
    })
  } catch (error) {

  }
}