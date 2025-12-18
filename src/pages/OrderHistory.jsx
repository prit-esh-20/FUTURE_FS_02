import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../services/orderService';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Calendar, ChevronRight } from 'lucide-react';

const OrderHistory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            const userOrders = await getUserOrders(user.email);
            setOrders(userOrders);
            setLoading(false);
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) {
        return <div className="text-center py-10">Loading orders...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center bg-white p-12 rounded-lg shadow-sm border border-gray-100">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-full">
                                            <Package className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {new Date(order.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Confirmed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <ul className="divide-y divide-gray-100">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="py-2 flex justify-between items-center text-sm">
                                                <span className="text-gray-600">
                                                    {item.quantity}x {item.title}
                                                </span>
                                                <span className="font-medium text-gray-900">
                                                    ₹{item.price * item.quantity}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Total Amount</span>
                                    <span className="text-lg font-bold text-blue-600">
                                        ₹{order.total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
