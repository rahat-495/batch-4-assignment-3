# Blogging Platform Backend

## 📌 Project Overview
This is a secure and efficient backend for a blogging platform where users can create, update, and delete their own blogs, while admins have special permissions to manage users and their blogs. The platform supports authentication, role-based access control, and public blog APIs with search, sorting, and filtering functionalities.

## 🚀 Live Demo
[Live API URL] (if hosted, provide the link here)

## 🔥 Features
- **User Roles:** Admin & User with distinct privileges.
- **Authentication & Authorization:** Secure login and role-based access control using JWT.
- **CRUD Operations for Blogs:** Users can create, edit, and delete their own blogs.
- **Admin Privileges:** Can block users and delete any blog.
- **Public Blog API:** Supports search, sorting, and filtering.
- **Error Handling:** Standardized error responses for better debugging.

## 🛠️ Technology Stack
- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Zod

## ⚙️ Installation & Setup
### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud-based)
- NPM or Yarn package manager

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/rahat-495/batch-4-assignment-3.git
 cd batch-4-assignment-3
```

### 2️⃣ Install Dependencies
```sh
 npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
PORT=5555
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server
```sh
 npm run dev
```
The server will be running on `http://localhost:5555`

## 🔑 API Endpoints
### 1️⃣ Authentication
#### Register User
- **POST** `/api/auth/register`
#### Login User
- **POST** `/api/auth/login`

### 2️⃣ Blog Management
#### Create Blog
- **POST** `/api/blogs`
#### Update Blog
- **PATCH** `/api/blogs/:id`
#### Delete Blog
- **DELETE** `/api/blogs/:id`
#### Get All Blogs (Public API)
- **GET** `/api/blogs?search=&sortBy=&sortOrder=&filter=`

### 3️⃣ Admin Actions
#### Block User
- **PATCH** `/api/admin/users/:userId/block`
#### Delete Any Blog
- **DELETE** `/api/admin/blogs/:id`

## 🛡️ Error Handling
The API follows a consistent error response format:
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "error": { "details": "Additional info" }
}
```
Handled errors include:
- **Validation Errors** (Zod validation, missing fields, incorrect formats)
- **Authentication & Authorization Errors** (Invalid token, insufficient permissions)
- **Not Found Errors** (User or blog not found)
- **Internal Server Errors** (Unhandled exceptions)

## 👨‍💻 Contributing
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push and open a pull request.

---
🎯 *Happy Coding!* 🚀

