# ShopSphere - Mini E-Commerce Platform

ShopSphere is a modern, responsive mini e-commerce web application that simulates a real-world online shopping experience. Built with React and Tailwind CSS, it features a clean UI, product browsing, cart management, and a simulated checkout process.

## 🚀 Live Demo

https://shopsphere-by-pritesh.netlify.app/

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS, PostCSS
- **State Management:** React Context API
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Data Source:** FakeStoreAPI
- **Animations:** CSS Keyframes & Tailwind Utilities

## ✨ Features

- **Home / Products:** Browse products with grid layout, search by name, and filter by category.
- **Product Details:** View detailed product info, large images, and add to cart with quantity selection.
- **Shopping Cart:** Manage cart items, view subtotal and total prices, and adjust quantities.
- **Checkout:** Simulated checkout form with validation (simulated processing).
- **Responsiveness:** Fully responsive design for mobile, tablet, and desktop.
- **Animations:** Smooth page transitions, hover effects, and confetti on success!

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, ProductCard, etc.)
├── context/        # Global state management (CartContext)
├── pages/          # Page components (Home, Cart, Checkout, etc.)
├── services/       # API integration (api.js)
├── App.jsx         # Main application component with Routing
└── main.jsx        # Entry point
```

## 🏃‍♂️ Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ShopSphere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
