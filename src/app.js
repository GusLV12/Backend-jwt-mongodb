import express from 'express';
import morgan from 'morgan'
import RouterProduct from './routes/products.routes.js';

const app = express();

export const port = 3000;

app.use(morgan('dev'));
app.use(express.json())

app.use('/products', RouterProduct);

export default app;