# ShopNexGen - Multivendor E-Commerce Platform 🛒

![Tech Stack](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

A full-stack multivendor marketplace connecting sellers and buyers with secure transactions, real-time inventory management, and role-based access control.

## 🌟 Key Features

### **User Roles**
- **Customers**: Browse products, secure checkout, order tracking, wishlists
- **Sellers**: Inventory management, sales analytics, payment tracking
- **Admins**: User management, content control, platform oversight

### **Core Functionalities**
- 🔒 **Security**: JWT authentication + Spring Security
- 💳 **Payments**: Razorpay/Stripe integration with multiple methods
- 📊 **Dashboards**: Real-time analytics for sellers/admins
- 📦 **Inventory**: Stock tracking with low-stock alerts
- 🚚 **Order Management**: Real-time updates + shipment tracking
- ⚡ **Performance**: Handles 10k+ concurrent users

## 🛠 Tech Stack

| Layer          | Technologies                                                                 |
|----------------|------------------------------------------------------------------------------|
| **Frontend**   | React, Redux, Material-UI, Axios                                             |
| **Backend**    | Java 17, Spring Boot 3, Spring Security, JPA/Hibernate                       |
| **Database**   | MySQL 8 (ACID compliant)                                                     |
| **DevOps**     | Maven, Git, Postman, Swagger                                                 |
| **Security**   | BCrypt password hashing, JWT tokens, HTTPS encryption                        |

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven
- 

### Installation
```bash
# Clone repository
git clone <reporitorylink.git>

# Backend setup
cd backend
mvn clean install
# Configure application.properties with DB credentials

# Frontend setup
cd ../frontend
npm install
# Configure .env with API endpoints
