import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import OrderHistory from './pages/OrderHistory';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="product/:id" element={<ProductDetails />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route path="success" element={<OrderSuccess />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="admin" element={<AdminDashboard />} />
                            <Route path="orders" element={<OrderHistory />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
