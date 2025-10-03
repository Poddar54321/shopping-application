import { Review, Product, User } from '../models/index.js';
import { sequelize } from '../config/database.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [
        {
          model: User,
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
export const addReview = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { productId, rating, comment } = req.body;
    
    // Check if product exists
    const product = await Product.findByPk(productId);
    
    if (!product) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });
    
    if (existingReview) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }
    
    // Create review
    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      comment
    }, { transaction: t });
    
    // Update product rating and review count
    const reviews = await Review.findAll({
      where: { productId },
      attributes: ['rating']
    });
    
    const avgRating = reviews.reduce((acc, item) => acc + parseFloat(item.rating), 0) / reviews.length;
    
    product.rating = avgRating.toFixed(1);
    product.reviewCount = reviews.length;
    await product.save({ transaction: t });
    
    await t.commit();
    
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { rating, comment } = req.body;
    
    const review = await Review.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!review) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save({ transaction: t });
    
    // Update product rating
    const reviews = await Review.findAll({
      where: { productId: review.productId },
      attributes: ['rating']
    });
    
    const avgRating = reviews.reduce((acc, item) => acc + parseFloat(item.rating), 0) / reviews.length;
    
    const product = await Product.findByPk(review.productId);
    product.rating = avgRating.toFixed(1);
    await product.save({ transaction: t });
    
    await t.commit();
    
    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!review) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    const productId = review.productId;
    await review.destroy({ transaction: t });
    
    // Update product rating and count
    const reviews = await Review.findAll({
      where: { productId },
      attributes: ['rating']
    });
    
    const product = await Product.findByPk(productId);
    
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((acc, item) => acc + parseFloat(item.rating), 0) / reviews.length;
      product.rating = avgRating.toFixed(1);
    } else {
      product.rating = 0;
    }
    
    product.reviewCount = reviews.length;
    await product.save({ transaction: t });
    
    await t.commit();
    
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};
