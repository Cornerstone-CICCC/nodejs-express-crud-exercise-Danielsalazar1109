import { Router, Request, Response } from "express";
import { Product, ProductRequestBody } from "../types/producttype";
import { v4 as uuidV4 } from "uuid";

const productRouter = Router();


let products: Product[] = [];


productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});


productRouter.post(
  "/",
  (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
    const newProducts: Product = {
      id: uuidV4(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    products = [...products, newProducts];
    res.status(201).send(`New product added successfully...`);
  }
);


productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    res.status(200).json(foundProduct);
  }
  res.status(404).send(`Product not found.`);
});


productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...products[productIndex],
        name: req.body.name ?? products[productIndex].name,
        description: req.body.description ?? products[productIndex].description,
        price: req.body.price ?? products[productIndex].price,
      };
      products[productIndex] = updatedProduct;
      res.status(201).json(updatedProduct);
    }
    res.status(404).send(`Product not found.`);
  }
);


productRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    products = products.filter((product) => product.id !== id);
    res.status(200).send(`Product was deleted successfully...!`);
  }
  res.status(404).send(`Product not found.`);
});

export default productRouter;