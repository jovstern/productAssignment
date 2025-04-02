import express from "express";
import {productControllersGet} from '../controllers/productsControllers.js';

const router = express.Router();


// /api/users
router.get('/product', productControllersGet);

export default router;
