import {Request, Response} from "express"
import { routes } from "Routes/router";
/**
 * @param  {Request} req
 * @param  {Response} res
 */
export default function (req:Request, res:Response) {
    
    res.send("Routes are : " + routes);
}