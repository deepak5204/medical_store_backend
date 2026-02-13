#   Medical Store Inventory Management System (Backend)
A production-ready backend for managing medical store inventory including medicine management, authentication, stock alerts, expiry tracking, dashboard analytics, and API documentation.

##  Features

### Authentication & Authorization
-   JWT-based authentication
-   Password hashing using bcrypt
-   Role-Based Access Control (Admin / Staff)

### Medicine Management
-   Add Medicine
-   Update Medicine
-   Delete Medicine
-   Get All Medicines
-   Search Medicines
-   Pagination Support

### Smart Inventory Alerts
-   Low Stock Detection (Custom Threshold Support)
-   Expiring Soon Medicines (Next 30 Days)

### Dashboard Analytics
-   Total Medicines Count
-   Low Stock Medicines Count
-   Expiring Soon Count
-   Total Inventory Value Calculation

### API Documentation
-   Swagger UI Integration
-   Interactive API Testing

### Production Ready Enhancements
-   Request Validation using Joi
-   Global Error Handling Middleware
-   Secure Environment Configuration

### Tech Stack
| Layer      | Technology                 |
| ---------- | -------------------------- |
| Backend    | Node.js, Express.js        |
| Database   | MongoDB, Mongoose          |
| Auth       | JWT, bcrypt                |
| Validation | Joi                        |
| API Docs   | Swagger                    |
| Logging    | (Optional if added Morgan) |


### Project Structure
medical-store/
│
├ config/
├ controllers/
├ middleware/
├ models/
├ routes/
├ validation/
├ utils/
├ .env
├ app.js


## Installation
### Clone Repository
```bash
git clone https://github.com/deepak5204/medical_store_backend.git
cd medical-store
```

### Install Dependencies
```bash
npm install
```

### Setup Environment Variables
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES=7d
```

### Run Server
```bash
Run Server
```

### API Documentation
Swagger Docs Available At:
```bash
http://localhost:3000/api-docs
```

### Authentication Flow
1️⃣ Register User
2️⃣ Login User → Get JWT Token
3️⃣ Use Token in Header

### Dashboard API
```bash
GET /api/dashboard/stats
```
**Returns:**
-   Total Medicines
-   Low Stock Count
-   Expiring Soon Count
-   Total Inventory Value