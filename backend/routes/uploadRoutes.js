import express from 'express';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage
} from '../controllers/uploadController.js';
import upload from '../middleware/upload.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require admin authentication
router.use(authenticate);
router.use(authorize('admin'));

// Upload single image
router.post('/image', upload.single('image'), uploadImage);

// Upload multiple images (max 5)
router.post('/images', upload.array('images', 5), uploadMultipleImages);

// Delete image
router.delete('/image/:publicId', deleteImage);

export default router;
