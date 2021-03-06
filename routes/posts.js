import express from 'express';

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
  getPostByUser,
} from '../controllers/posts.js';

const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/user/:id', getPostByUser);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);
export default router;
