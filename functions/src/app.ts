import express, { Express } from "express";
import dotenv from "dotenv";
import router, { routes } from "../Routes/router";
const cors = require("cors")({ origin: true });

dotenv.config();

const app: Express = express();

app.use(cors);

app.use(router);


// app.listen(process.env.PORT ?? 8080, () => {
  console.log("Online on port ", process.env.PORT ?? 8080) ;
  console.log("Routes are :\n", routes);
// });

export default app;