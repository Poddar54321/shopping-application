import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Wishlist from './Wishlist.js';
import Review from './Review.js';

// User associations
User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Wishlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Product associations
Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'RESTRICT' });
Product.hasMany(Wishlist, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// Order associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Wishlist associations
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

// Review associations
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

export {
  User,
  Product,
  Cart,
  Order,
  OrderItem,
  Wishlist,
  Review
};
