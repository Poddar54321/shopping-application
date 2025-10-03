# Cloudinary Upload API - Request Examples

## 🔐 Prerequisites

1. Server running on `http://localhost:5000`
2. Admin user created and logged in
3. JWT token obtained from login

---

## 📝 Example Requests

### 1. Register Admin User

**POST** `http://localhost:5000/api/auth/register`

**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@clothingstore.com",
  "password": "SecurePass123",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-here",
    "name": "Admin User",
    "email": "admin@clothingstore.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

💾 **Save the token!**

---

### 2. Login Admin User

**POST** `http://localhost:5000/api/auth/login`

**Body (JSON):**
```json
{
  "email": "admin@clothingstore.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "uuid-here",
    "name": "Admin User",
    "email": "admin@clothingstore.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Upload Single Image

**POST** `http://localhost:5000/api/upload/image`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data
```

**Body (form-data):**
```
Key: image
Type: File
Value: [Select your image file]
```

**Using Postman:**
1. Select "Body" tab
2. Choose "form-data"
3. Add key "image"
4. Change type to "File" (dropdown on right)
5. Click "Select Files" and choose your image

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/di4e7wvwt/image/upload/v1702345678/clothing-store/products/product-1702345678-123456789.jpg",
    "public_id": "clothing-store/products/product-1702345678-123456789"
  }
}
```

---

### 4. Upload Multiple Images

**POST** `http://localhost:5000/api/upload/images`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data
```

**Body (form-data):**
```
Key: images
Type: File
Value: [Select multiple files - up to 5]
```

**Using Postman:**
1. Body → form-data
2. Key: "images" (note: singular, not plural)
3. Type: File
4. Select multiple files (hold Ctrl/Cmd)
5. Maximum 5 files at once

**Response:**
```json
{
  "success": true,
  "message": "5 images uploaded successfully",
  "data": [
    {
      "url": "https://res.cloudinary.com/di4e7wvwt/image/upload/.../image1.jpg",
      "public_id": "clothing-store/products/product-xxx-111"
    },
    {
      "url": "https://res.cloudinary.com/di4e7wvwt/image/upload/.../image2.jpg",
      "public_id": "clothing-store/products/product-xxx-222"
    }
  ]
}
```

---

### 5. Create Product with Uploaded Image

**POST** `http://localhost:5000/api/products`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Premium Cotton T-Shirt",
  "price": 29.99,
  "image": "https://res.cloudinary.com/di4e7wvwt/image/upload/v1702345678/clothing-store/products/product-1702345678-123456789.jpg",
  "category": "men",
  "description": "High-quality cotton t-shirt perfect for everyday wear. Soft, comfortable, and durable.",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White", "Navy"],
  "stock": 100
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "product-uuid",
    "name": "Premium Cotton T-Shirt",
    "price": "29.99",
    "image": "https://res.cloudinary.com/...",
    "category": "men",
    "description": "High-quality cotton t-shirt...",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Black", "White", "Navy"],
    "stock": 100,
    "rating": "0.0",
    "reviewCount": 0,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 6. Delete Image from Cloudinary

**DELETE** `http://localhost:5000/api/upload/image/:publicId`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**URL Example:**
```
http://localhost:5000/api/upload/image/clothing-store%2Fproducts%2Fproduct-1702345678-123456789
```

⚠️ **Important:** URL encode the public_id:
- Replace `/` with `%2F`
- Replace spaces with `%20`

**Original:** `clothing-store/products/product-1702345678-123456789`
**Encoded:** `clothing-store%2Fproducts%2Fproduct-1702345678-123456789`

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## 🛠️ Testing Tools

### Postman
1. Download from https://www.postman.com/downloads/
2. Import the requests above
3. Set Authorization header with your token

### Thunder Client (VS Code Extension)
1. Install Thunder Client extension
2. Create new request
3. Add requests as shown above

### cURL (Command Line)

**Upload Image:**
```bash
curl -X POST http://localhost:5000/api/upload/image \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@C:/path/to/your/image.jpg"
```

**Delete Image:**
```bash
curl -X DELETE "http://localhost:5000/api/upload/image/clothing-store%2Fproducts%2Fproduct-xxx" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ⚠️ Common Errors

### "Not authorized to access this route"
**Solution:** Add JWT token to Authorization header as `Bearer YOUR_TOKEN`

### "User role 'customer' is not authorized"
**Solution:** Login as admin user, not customer

### "Only image files are allowed"
**Solution:** Upload only .jpg, .jpeg, .png, .webp, or .gif files

### "File too large"
**Solution:** Image must be under 5MB

### "Please upload an image file"
**Solution:** Check form-data key is exactly "image" (singular) for single upload

---

## 📊 Image Specifications

- **Allowed Formats:** JPG, JPEG, PNG, WebP, GIF
- **Max File Size:** 5MB per image
- **Max Resolution:** 1000x1000px (auto-resized if larger)
- **Storage Folder:** `clothing-store/products`
- **Multiple Upload Limit:** 5 images at once

---

## 🎯 Complete Workflow

1. ✅ Register/Login as admin → Get JWT token
2. ✅ Upload product image → Get image URL and public_id
3. ✅ Create product using the image URL
4. ✅ Product appears with image in catalog
5. ✅ (Optional) Delete old image when updating product

---

## 📸 Image URL Format

Cloudinary returns URLs in this format:
```
https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{filename}.{ext}
```

Example:
```
https://res.cloudinary.com/di4e7wvwt/image/upload/v1702345678/clothing-store/products/product-1702345678-123456789.jpg
```

You can also add transformations directly in the URL:
```
https://res.cloudinary.com/di4e7wvwt/image/upload/w_500,h_500,c_fill/clothing-store/products/product-xxx.jpg
```

This creates a 500x500px thumbnail on-the-fly!

---

Happy Testing! 🚀