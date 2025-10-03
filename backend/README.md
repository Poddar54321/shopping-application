# Online Clothing Shopping Website - Backend

Complete Node.js + Express + Sequelize backend API for an e-commerce clothing store.

## ✅ Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Customer/Admin)
  - Password hashing with bcrypt

- **Product Management**
  - CRUD operations for products
  - Product filtering, search, and sorting
  - Category-based organization
  - Stock management

- **Shopping Cart**
  - Add/update/remove items
  - Size and color selection
  - Persistent cart storage

- **Orders**
  - Order creation with transaction handling
  - Order tracking and status updates
  - Order history for customers
  - Admin order management

- **Wishlist**
  - Add/remove products
  - Toggle wishlist items
  - View all wishlist items

- **Reviews & Ratings**
  - Add product reviews
  - Update/delete own reviews
  - Automatic product rating calculation
  - Review count tracking

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL or PostgreSQL database
- npm or yarn package manager

## 🚀 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup MySQL Database:**

   For MySQL:
   ```bash
   # Login to MySQL
   mysql -u root -p

   # Create database
   CREATE DATABASE clothing_store;
   exit;
   ```

   For PostgreSQL:
   ```bash
   # Login to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE clothing_store;
   \q
   ```

3. **Configure Environment Variables:**

   Update the `.env` file with your database credentials:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306  # 5432 for PostgreSQL
   DB_NAME=clothing_store
   DB_USER=root  # or your database username
   DB_PASSWORD=your_actual_password

   # JWT Secret (change this to a random string)
   JWT_SECRET=your_super_secret_jwt_key_12345_change_this
   JWT_EXPIRE=7d

   # Frontend URL
   CLIENT_URL=http://localhost:5173
   ```

4. **Database Sync:**

   The application will automatically create all tables on first run due to:
   ```javascript
   await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
   ```

5. **Start the Server:**

   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

   Server will run on: `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js        # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── wishlistController.js
│   └── reviewController.js
├── middleware/
│   ├── auth.js           # Authentication middleware
│   └── errorHandler.js   # Global error handler
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   ├── OrderItem.js
│   ├── Wishlist.js
│   ├── Review.js
│   └── index.js          # Model associations
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── wishlistRoutes.js
│   └── reviewRoutes.js
├── .env                  # Environment variables
├── server.js             # Main application file
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add to cart (Protected)
- `PUT /api/cart/:id` - Update cart item (Protected)
- `DELETE /api/cart/:id` - Remove from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Wishlist
- `GET /api/wishlist` - Get wishlist (Protected)
- `POST /api/wishlist` - Add to wishlist (Protected)
- `POST /api/wishlist/toggle` - Toggle wishlist (Protected)
- `DELETE /api/wishlist/:id` - Remove from wishlist (Protected)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 👥 Default Users

You can create users via the `/api/auth/register` endpoint. 

For testing, create an admin user:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

## 🛠️ Database Dialect

The application is configured for **MySQL** by default. To use **PostgreSQL**:

1. Update `config/database.js`:
   ```javascript
   dialect: 'postgres',  // Change from 'mysql'
   ```

2. Update `.env`:
   ```env
   DB_PORT=5432  # PostgreSQL default port
   ```

3. Make sure `pg` and `pg-hstore` packages are installed (already in package.json)

## 🐛 Bugs Fixed

All critical bugs have been fixed:
- ✅ Database import path corrected
- ✅ All route files created
- ✅ Wishlist controller implemented
- ✅ Review controller implemented
- ✅ All model associations configured
- ✅ Error handling middleware added
- ✅ Authentication middleware working

## 📝 Notes

- The server automatically syncs database schema in development mode
- Passwords are hashed automatically using bcrypt hooks
- Product ratings are calculated automatically when reviews are added/updated/deleted
- Orders use database transactions to ensure data consistency
- All timestamps (createdAt, updatedAt) are handled automatically by Sequelize

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Setup MySQL/PostgreSQL database
3. Update `.env` with your database credentials
4. Run the server: `npm run dev`
5. Test API endpoints using Postman or your frontend
6. Create an admin user for product management

## 📞 Support

For issues or questions, check the bug report artifact created in this conversation.
