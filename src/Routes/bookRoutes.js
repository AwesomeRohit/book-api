import expres from "express"
import { jwtAuthandSession } from "../middlewares/jwtAndSession.js";
import { getAllbooks,addBook,deleteBook } from "../controllers/bookControllers.js";
import { isAdmin } from "../middlewares/checkadmin.js";

const router = expres.Router();

router.get('/', getAllbooks);

router.post('/addBook', jwtAuthandSession, isAdmin, addBook);

router.delete('/deleteBook', jwtAuthandSession, isAdmin ,deleteBook);

export default router;