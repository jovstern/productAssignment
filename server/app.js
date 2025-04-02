import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from "helmet";

import {errorHandler} from './middlewares/errorHandler.js'
import productsRoutes from './routes/products.js';

dotenv.config()

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', productsRoutes);

app.use((req,res, next) => {
    res.status(404).json({message: 'not found'});
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});