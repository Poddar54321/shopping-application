/**
 * CLOUDINARY UPLOAD TEST GUIDE
 * 
 * Follow these steps to test image upload:
 */

// Step 1: Start the server
// npm run dev

// Step 2: Create an admin user
// POST http://localhost:5000/api/auth/register
const registerAdmin = {
  name: "Admin User",
  email: "admin@test.com",
  password: "admin123",
  role: "admin"
};

// Step 3: Login and get token
// POST http://localhost:5000/api/auth/login
const loginAdmin = {
  email: "admin@test.com",
  password: "admin123"
};
// Save the token from response

// Step 4: Upload image using Postman/Thunder Client
// POST http://localhost:5000/api/upload/image
// Headers: Authorization: Bearer YOUR_TOKEN_HERE
// Body: form-data
//   Key: image (type: File)
//   Value: Select your image file

// Expected Response:
const successResponse = {
  success: true,
  message: "Image uploaded successfully",
  data: {
    url: "https://res.cloudinary.com/di4e7wvwt/image/upload/v1234567890/clothing-store/products/product-1234567890.jpg",
    public_id: "clothing-store/products/product-1234567890"
  }
};

// Step 5: Use the URL in product creation
// POST http://localhost:5000/api/products
// Headers: Authorization: Bearer YOUR_TOKEN_HERE
const createProduct = {
  name: "Test Product",
  price: 29.99,
  image: "USE_THE_URL_FROM_STEP_4_HERE",
  category: "men",
  description: "Test product description",
  sizes: ["S", "M", "L"],
  colors: ["Black", "White"],
  stock: 50
};

/**
 * TESTING WITH CURL (Alternative to Postman)
 */

// Upload image:
// curl -X POST http://localhost:5000/api/upload/image \
//   -H "Authorization: Bearer YOUR_TOKEN" \
//   -F "image=@/path/to/your/image.jpg"

// Delete image:
// curl -X DELETE "http://localhost:5000/api/upload/image/clothing-store%2Fproducts%2Fproduct-1234567890" \
//   -H "Authorization: Bearer YOUR_TOKEN"

/**
 * CLOUDINARY DASHBOARD
 * 
 * View your uploaded images at:
 * https://cloudinary.com/console/media_library
 * 
 * Your images will be in folder: clothing-store/products
 */

export { registerAdmin, loginAdmin, createProduct };
