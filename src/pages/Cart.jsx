import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cartItems, getTotalPrice, getTotalItems } = useCart();
    const navigate = useNavigate();

    const subtotal = getTotalPrice();
    const shipping = subtotal > 3000 ? 0 : 200; // Free shipping over ₹3000
    const total = subtotal + (cartItems.length > 0 ? shipping : 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({getTotalItems()} items)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4 font-medium">
                        <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                    </Link>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 border-b pb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                            </div>
                            {shipping > 0 && (
                                <div className="text-xs text-blue-500 bg-blue-50 p-2 rounded">
                                    Add ₹{(3000 - subtotal).toFixed(2)} more for free shipping!
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-8">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
