import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { saveOrder } from '../services/orderService';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Checkout = () => {
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = getTotalPrice();

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{5,6}$/.test(formData.pincode)) { // Basic pincode check
            newErrors.pincode = 'Pincode must be 5-6 digits';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                items: cartItems,
                total: total,
                shipping: formData,
                userEmail: user ? user.email : formData.email // Associate with logged in user or guest email
            };

            await saveOrder(orderData);

            clearCart();
            setIsSubmitting(false);
            navigate('/success');
        } catch (error) {
            console.error('Order failed', error);
            setIsSubmitting(false);
            setErrors({ submit: 'Failed to place order. Please try again.' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="John Doe"
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="123 Main St"
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="New York"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="10001"
                                />
                                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 mt-4 flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-inner h-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 flex-1 truncate pr-4">{item.quantity} x {item.title}</span>
                                <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold text-gray-900 mt-4">
                            <span>Total Amount</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
