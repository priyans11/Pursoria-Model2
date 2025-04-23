# Pursoria - Premium Bags & Accessories E-commerce Website

Pursoria is a modern e-commerce platform built for selling premium bags and accessories. The application features a complete shopping experience with user authentication, product browsing, cart management, and an admin panel for managing products and orders.

![Pursoria](will be deployed soon)

## Features

### User Features
- **User Authentication**: Secure signup and login functionality
- **Product Browsing**: View all products with filtering and sorting options
- **Shopping Cart**: Add products to cart, update quantities, and checkout
- **Responsive Design**: Optimized for mobile, tablet, and desktop views

### Admin Features
- **Admin Dashboard**: Secure admin panel for store management
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and process customer orders
- **Customer Management**: Access customer information and purchase history

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript Templates), TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **File Uploads**: Multer
- **Other Tools**: Flash messages, Cookie parser, Express session

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pursoria
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   JWT_KEY=your_jwt_secret_key
   EXPRESS_SESSION_SECRET=your_session_secret
   NODE_ENV=development
   ```

4. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - The default connection string is `mongodb://127.0.0.1:27017/pursoria`
   - Modify the connection string in `config/development.json` if needed

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   - Customer website: `http://localhost:3000`
   - Admin login: `http://localhost:3000/owners/login`

## Default Admin Credentials (Development Only)
- Email: admin@pursoria.com
- Password: admin123

## Project Structure

```
Pursoria/
├── config/               # Configuration files
├── controllers/          # Route controllers
├── middlewares/          # Custom middleware functions
├── models/               # Database models
├── public/               # Static assets (CSS, JS, images)
├── routes/               # Route definitions
├── utils/                # Utility functions
├── views/                # EJS templates
├── app.js                # Application entry point
└── package.json          # Project metadata and dependencies
```

## Dependencies to Install

If you clone this repository without the node_modules folder, you'll need to install the following dependencies:

```bash
npm install bcrypt config connect-flash cookie-parser debug dotenv ejs express express-session jsonwebtoken mongoose multer
```

## Development

To run the application in development mode:

```bash
set NODE_ENV=development  # For Windows
export NODE_ENV=development  # For Linux/Mac
npm start
```

For PowerShell on Windows:
```powershell
$env:NODE_ENV='development'
npm start
```

## Features to Implement

- [ ] Payment gateway integration
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Advanced search functionality
- [ ] Email notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Acknowledgments

- TailwindCSS for the styling
- RemixIcon for the icons