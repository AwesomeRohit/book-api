import Book from "../models/book.model.js"
import redis from "../utilities/redis.js";

export const getAllbooks = async (req, res) => {

    try {
        const getBook = await redis.get("book")
         if(getBook){
            return res.status(200).json(JSON.parse(getBook));
         }
     
        const books = await Book.find({});
         
        await redis.set("book", JSON.stringify(books), "EX", 3600);
        
        return res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching Books ", error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const addBook = async (req,res)=>{

      try {
            const {title, author , genere , publicationYear} = req.body;

              if(!title || !author || !genere || !publicationYear) {
                return res.status(400).json({message : "All fields are Required!"});
              }
              const newBook = new Book({
                title,
                author,
                genere,
                publicationYear,

              })
              if (newBook){
                await newBook.save();
                try {
                    const bookKey = `book:${title}`
                await redis.set(bookKey,JSON.stringify({newBook}), "EX", 3600);
                console.log(`Your Book Key is ${bookKey}`)
                } catch (error) {
                    console.error("Error saving to cache", error.message);
                }
                const bookKey = `book:${title}`
                await redis.set(bookKey,JSON.stringify({newBook}), "EX", 3600);
                
              }
              return res.status(201).json({ message: "Book added successfully!" });
      } catch (error) {
        console.error("error creating book", error.message);
        return res.status(500).json({message : "Internal Server Error While Adding Books"})
        
      }
}
export const deleteBook = async (req,res)=>{

    const {title} = req.body;
      try {
            if(!title) return res.status(400).json({message : "Title field is required to delete a book!"})
              
                const remove = await Book.findOneAndDelete({title});

                if(!remove) {
                    return res.status(404).json({message : `Book with title ${title} not found!`})
                }
                 return res.status(200).json({message : `book with title ${title} succesfully deleted!`})
      } catch (error) {
        
      }
}