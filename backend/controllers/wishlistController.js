import { Wishlist, Product } from '../models/index.js';

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image', 'category', 'rating', 'stock']
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: wishlistItems.length,
      data: wishlistItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist',
      error: error.message
    });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });
    
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist'
      });
    }
    
    // Add to wishlist
    const wishlistItem = await Wishlist.create({
      userId: req.user.id,
      productId
    });
    
    res.status(201).json({
      success: true,
      message: 'Product added to wishlist',
      data: wishlistItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to wishlist',
      error: error.message
    });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found'
      });
    }
    
    await wishlistItem.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from wishlist',
      error: error.message
    });
  }
};

// @desc    Toggle wishlist item (add if not exists, remove if exists)
// @route   POST /api/wishlist/toggle
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });
    
    if (existingItem) {
      // Remove from wishlist
      await existingItem.destroy();
      return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist',
        action: 'removed'
      });
    }
    
    // Add to wishlist
    const wishlistItem = await Wishlist.create({
      userId: req.user.id,
      productId
    });
    
    res.status(201).json({
      success: true,
      message: 'Product added to wishlist',
      action: 'added',
      data: wishlistItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling wishlist',
      error: error.message
    });
  }
};
