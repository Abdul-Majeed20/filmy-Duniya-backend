import express from 'express';
import { getTrendingMovies, updateSearchCount } from '../controllers/movieControllers.js';
const router = express.Router();

router.post('/updateSearch', updateSearchCount);
router.get('/get-trending', getTrendingMovies);

export default router;