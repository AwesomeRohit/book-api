import expres from "express"
import { jwtAuthandSession } from "../middlewares/jwtAndSession.js";
import { getAllbooks,addBook,deleteBook } from "../controllers/bookControllers.js";

const router = expres.Router();

router.get('/', getAllbooks);

router.post('/addBook', jwtAuthandSession, addBook);

router.delete('/deleteBook', jwtAuthandSession, deleteBook);

export default router;