import express, { Router,  Request, Response} from "express";
import dotenv from "dotenv";
import uploadController from "../Controllers/uploadController";
const multer = require("express-multipart-file-parser");

dotenv.config();

const router: Router = express.Router();
router.post("/upload", multer, uploadController);
const routes: string[] = router.stack.map(
  (layer) =>
    "http://" + (process.env.IP ?? 'localhost') + ":" + process.env.PORT + layer.route.path
);
router.get("/", (req:Request, res:Response) => {
  res.send(routes);
})

export default router;
export { routes };
