import express from "express";
import morgan from "morgan";
import RouterProduct from "./routes/products.routes.js";
import routerUser from "./routes/auth.routes.js";
import { createRoles } from "./libs/initialsetup.js";

const app = express();

export const port = 4000;

app.use(morgan("dev"));
app.use(express.json());
createRoles();

app.use("/products", RouterProduct);
app.use("/", routerUser);

export default app;
