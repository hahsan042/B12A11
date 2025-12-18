# LocalChefBazaar — Marketplace for Local Home-Cooked Meals

## Purpose
LocalChefBazaar is a modern online platform that connects home cooks (chefs) with customers who are looking for fresh, homemade food. This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) to assess skills in full-stack development. It features user authentication with Firebase, secure API routes with JWT tokens, and allows customers to explore menus, place orders, and track them in real-time. Home cooks can upload their meals and earn money without needing a physical restaurant.

## Live URL
- **Frontend (Client)**: [https://gleeful-trifle-a97444.netlify.app](https://gleeful-trifle-a97444.netlify.app)  *(Replace with your actual live URL on Netlify)*
- **Backend (Server)**: [https://chefbazar-gray.vercel.app](https://chefbazar-gray.vercel.app)  *(Replace with your actual live URL on Vercel)*

## Key Features
- **User Roles & Permissions**: Three primary roles—Admin, Chef, and Customer.
- **User Authentication**: Firebase Authentication with JWT token-based secure routes.
- **Role-based Access Control**: Admin has full access; Chef can upload meals; Customer can browse, order, and review meals.
- **Meal Ordering**: Customers can browse daily menus, place orders, and track them.
- **Meal Reviews & Favorites**: Customers can leave reviews and add meals to favorites.
- **Admin Dashboard**: Admin can manage users, handle requests, view statistics.
- **Chef Dashboard**: Chefs can create meals, manage orders, and track their sales.
- **Payment Integration**: Stripe payment integration for order payments.
- **Responsive Design**: Fully responsive design to work seamlessly on both mobile and desktop devices.
- **Real-time Updates**: Real-time updates for orders and meal statuses.

## Technologies Used
- **Frontend**: React, React Router, React-Hook-Form, Axios, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, JWT (JSON Web Token) for authentication
- **Database**: MongoDB
- **Authentication**: Firebase Authentication & JWT-based token system
- **Payment Integration**: Stripe for order payment processing
- **Deployment**: 
  - Frontend: Netlify
  - Backend: Vercel
- **Libraries/Packages**:
  - Recharts (for platform statistics)
  - SweetAlert, Toast for success/failure notifications
  - React Icons for icons
  - dotenv for environment variable management

## Setup Instructions

### Prerequisites
- Node.js (>=14.x)
- MongoDB (For local development or MongoDB Atlas for cloud-based storage)
- Firebase Account (for user authentication setup)
- Stripe Account (for order payments)

