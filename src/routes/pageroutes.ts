import { Router, Request, Response } from "express";

const pageRouter = Router();

// Home
pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(`My home page`);
});

export default pageRouter;