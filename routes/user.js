import express from 'express';
const router = express.Router();

import { signin, signup, getUser, updateProfile } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.put('/profile/:id', updateProfile);
router.get('/', getUser);

export default router;
