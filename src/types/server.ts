import express from "express";
import productRouter from "../routes/product";
import pageRouter from "../routes/pageroutes";

const app = express();
app.use(express.json())


// Routes
app.use('/', pageRouter)
app.use('/products', productRouter)

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})